import { Section, ToggleSwitch } from "ui";
import "./style.scss";
function SeatSection() {
  
  return (
    <Section className="mt-2 seat-section">
      <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
        O'rindiq
      </h6>
      <div className="mt-3">
        <ToggleSwitch
          seat="front"
          label="Oldi yon o'rindiq"
          price={140000}
          discount={15000}
        />
        <ToggleSwitch
          seat="backLeft"
          label="Orqa chap o‘rindiq"
          price={120000}
          discount={10000}
        />
        <ToggleSwitch
          seat="backMiddle"
          label="Orqa o‘rta o‘rindiq"
          price={110000}
          discount={10000}
        />
        <ToggleSwitch
          seat="backRight"
          label="Orqa o‘ng o‘rindiq"
          price={120000}
          discount={10000}
        />
      </div>
    </Section>
  );
}

export default SeatSection;
