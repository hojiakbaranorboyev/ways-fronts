import { MapPin } from "lucide-react";
import { useAddressStore } from "store/useAddress";
import { SearchInput, Section } from "ui";

function FromSection({
  openDrawer,
  type,
}: {
  openDrawer: (type: "from" | "to", addressType: "region" | "district") => void;
  type: "from" | "to";
}) {
  const address = useAddressStore()[type].region?.name || "";
  const district = useAddressStore()[type].district?.name || "";
  const clearAddresses = useAddressStore().actions.clearAddresses;
  const clearAddress = useAddressStore().actions.clearAddress;
  return (
    <>
      <Section className="mt-2 pb-4">
        <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
          {type === "from" ? "Qayerdan" : "Qayerga"}
        </h6>
        <div className="mt-5">
          <SearchInput
            value={address}
            onChange={() => {}}
            icon={<MapPin size={18} />}
            placeholder="Viloyat*"
            onClick={(e) => !address && openDrawer(type, "region")}
            onClear={() => {
              if (type === "from") clearAddresses();
              else clearAddress("to");
            }}
            readOnly
          />
          <SearchInput
            className="mt-4"
            icon={<MapPin size={18} />}
            value={district}
            onChange={() => {}}
            placeholder="Shahar yoki tuman*"
            onClick={() => address && openDrawer(type, "district")}
            readOnly
          />
        </div>
      </Section>
    </>
  );
}

export default FromSection;
