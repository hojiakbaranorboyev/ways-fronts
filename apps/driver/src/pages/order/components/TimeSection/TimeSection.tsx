import { useTimeStore } from "store/useTimeStore";
// import TimeSectionModal from "./TimeSectionModal";
import SelectTime from "./BottomSheet/BottomSheet";
import { Section } from "ui";

function TimeSection() {
  const setModalOpen = useTimeStore((state) => state.actions.setModalOpen);
  const time = useTimeStore((state) => state.time);
  return (
    <>
      <Section
        className="mt-2 time-section flex items-center justify-between"
        onClick={() => setModalOpen(true)}
      >
        <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
          Jo'nash vaqti
        </h6>
        <p className="text-[var(--text-confirm-color)]">{time.value === "now" ? "Hozir" : `${time.type === "today" ? "Bugun" : "Ertaga"} ${time.value}` }</p>
      </Section>
      {/* <TimeSectionModal /> */}
      <SelectTime />
    </>
  );
}
export default TimeSection;
