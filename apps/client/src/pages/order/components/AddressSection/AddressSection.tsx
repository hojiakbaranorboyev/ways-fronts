// import { useAddressStore } from "store/useAddress";
import FromSection from "./FromSection";
import BottomSheet from "./BottomSheet/BottomSheet";
import { useAddressStore } from "store/useAddress";

function AddressSection() {
  const setIsDrawerOpen = useAddressStore().actions.setIsDrawerOpen;
  const setDrawerType = useAddressStore().actions.setAddressType;
  const setActiveType = useAddressStore().actions.setActiveType;

  const openDrawer = (
    type: "from" | "to",
    addressType: "region" | "district"
  ) => {
    setIsDrawerOpen(true);
    setDrawerType(addressType);
    setActiveType(type);
  };
  return (
    <>
      <FromSection openDrawer={openDrawer} type="from" />
      <FromSection openDrawer={openDrawer} type="to" />
      <BottomSheet />
      {/* <ToSection openDrawer={(e) => openDrawer("to", e)} /> */}
    </>
  );
}

export default AddressSection;
