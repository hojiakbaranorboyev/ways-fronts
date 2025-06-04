import { regionUrl } from "constants/urls";
import { useMemo, useState } from "react";
import { useAddressStore } from "store/useAddress";
import { BottomDrawer, ListSelection, SearchInput, useDataFetch } from "ui";
import computeCalc from "utils/computeCalc";

const maxHeight = computeCalc("calc(100vh - 50px)");
function Body({
  regionList,
  search,
}: {
  regionList: ReturnType<typeof useDataFetch<IAddress[]>>;
  search: string;
}) {
  // const addressType = useAddressStore().addressType;
  const { addressType, activeType, from, to, actions } = useAddressStore();

  const options = useMemo(() => {
    if (!regionList?.data) return [];
    if (addressType === "region") {
      const selectedRegionId =
        useAddressStore.getState().from.region?.id ||
        useAddressStore.getState().to.region?.id;
      const result = regionList?.data?.map((region) => ({
        id: region.id,
        name: region.name,
      }));

      if (selectedRegionId)
        return result.filter((item) => item?.id !== selectedRegionId);
      return result;
    } else {
      const regionId = useAddressStore.getState()[activeType].region?.id;
      const cities = regionList?.data?.find((item) => item.id === regionId);
      return cities?.children?.map((region) => ({
        id: region.id,
        name: region.name,
      }));
    }
  }, [addressType, regionList.data]);
  const selectedId:string = useMemo(() => {
    if(addressType === "region" && activeType === "from" && from.region?.id) return from.region?.id;
    if(addressType === "region" && activeType === "to" && to.region?.id) return to.region?.id;
    if(addressType === "district" && activeType === "from" && from.district?.id) return from.district?.id;
    if(addressType === "district" && activeType === "to" && to.district?.id) return to.district?.id;
    return "";
  }, []);
  const clickRegion = (region: Pick<IAddress, "id" | "name">) => {
    if (addressType === "region") {
      actions.setRegion(activeType, region);
      const store = useAddressStore.getState();
      if (
        !store[activeType === "from" ? "to" : "from"].region?.id &&
        regionList.data?.length! === 2
      ) {
        const otherRegion = regionList.data?.find(
          (item) => item.id !== region.id
        );
        if (otherRegion)
          actions.setRegion(activeType === "from" ? "to" : "from", otherRegion);
      }
    } else {
      actions.setDistrict(activeType, region);
    }
    actions.setIsDrawerOpen(false);
  };
  return (
    <div className="px-4 pb-4">
      <ListSelection
        options={
          options?.filter((region) =>
            region.name.toLowerCase().includes(search.toLowerCase())
          ) || []
        }
        selectedKeys={[selectedId]}
        onChange={(e) => clickRegion(e)}
      />
      {/* <ul className="space-y-2">
        {options
          ?.filter((region) =>
            region.name.toLowerCase().includes(search.toLowerCase())
          )
          ?.map((region) => (
            <li
              key={region.id}
              className="bg-[var(--tg-theme-secondary-bg-color)] rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer text-lg text-[var(--tg-theme-text-color)]"
              onClick={() => clickRegion(region)}
            >
              <span>{region.name}</span>
            </li>
          ))}
      </ul> */}
    </div>
  );
}
function BottomSheet() {
  const isDrawerOpen = useAddressStore().isDrawerOpen;
  const setIsDrawerOpen = useAddressStore().actions.setIsDrawerOpen;
  const addressType = useAddressStore().addressType;
  const regionList = useDataFetch<IAddress[]>({
    url: regionUrl,
    retryCount: 3,
  });
  const [search, setSearch] = useState("");
  const height = addressType === "district" ? maxHeight : 300;

  return (
    <BottomDrawer
      isOpen={isDrawerOpen}
      zIndex={99999}
      defaultHeight={height}
      minHeight={addressType === "district" ? height - 200 : height - 80}
      maxHeight={height}
      onClose={() => setIsDrawerOpen(false)}
      title={addressType === "region" ? "Viloyat" : "Shahar yoki tuman"}
      header={
        addressType === "district" && (
          <div className="pt-3">
            <SearchInput
              placeholder="Qidirish"
              value={search}
              onChange={(e) => setSearch(e)}
            />
          </div>
        )
      }
    >
      {isDrawerOpen && <Body regionList={regionList} search={search} />}
    </BottomDrawer>
  );
}

export default BottomSheet;
