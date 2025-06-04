import SearchInput from "components/inputs/SearchInput";
import Section from "components/section/Section";
import { MapPin } from "lucide-react";
import BottomSheet from "./BottomSheet/BottomSheet";

function ToSection({
  openDrawer,
}: {
  openDrawer: (addressType: "region" | "district") => void;
}) {
  return (
    <>
      <Section className="mt-2 pb-4">
        <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
          Qayerga
        </h6>
        <div className="mt-5">
          <SearchInput
            value={""}
            onChange={() => {}}
            icon={<MapPin size={18} />}
            placeholder="Viloyat"
          />
          <SearchInput
            className="mt-4"
            value={""}
            onChange={() => {}}
            placeholder="Shahar yoki tuman"
            icon={<MapPin size={18} />}
          />
        </div>
      </Section>
      <BottomSheet />
    </>
  );
}

export default ToSection;
