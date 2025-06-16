import { currencyFormat, Section, ToggleSwitch } from "ui";
import "./style.scss";
import { useMemo } from "react";
import { SeatKey, useSeatStore } from "store/useSeatStore";
function SeatSection() {
  const isOn = useSeatStore((state) => state.seats);
  const toggleSeat = useSeatStore((state) => state.toggleSeat);
  const seats = useMemo(() => {
    return [
      {
        type: "front",
        label: "Oldi yon o'rindiq",
        price: 140000,
        discount: 15000,
      },
      {
        type: "backLeft",
        label: "Orqa chap o'rindiq",
        price: 120000,
        discount: 10000,
      },
      {
        type: "backMiddle",
        label: "Orqa o'rta o'rindiq",
        price: 110000,
        discount: 10000,
      },
      {
        type: "backRight",
        label: "Orqa o'ng o'rindiq",
        price: 120000,
        discount: 10000,
      },
    ];
  }, []);
  return (
    <Section className="mt-2 seat-section">
      <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
        O'rindiq
      </h6>
      <div className="mt-3">
        {seats.map((seat) => (
          <ToggleSwitch
            key={seat.type}
            label={seat.label}
            isOn={!!isOn[seat.type as SeatKey]}
            desc={
              <>
                {currencyFormat(seat.price)} so'm
                {seat.discount
                  ? ` - (${currencyFormat(seat.discount)} so'm)`
                  : null}
              </>
            }
            onClick={() =>
              toggleSeat({
                type: seat.type as SeatKey,
                discount: seat.discount || 0,
                price: seat.price,
                isOn: !isOn[seat.type as SeatKey],
              })
            }
          />
        ))}
      </div>
    </Section>
  );
}

export default SeatSection;
