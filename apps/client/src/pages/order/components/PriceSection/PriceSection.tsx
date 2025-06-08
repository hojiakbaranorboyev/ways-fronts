import { useMemo } from "react";
import { useSeatStore } from "store/useSeatStore";
import { currencyFormat, Section } from "ui";

function PriceSection() {
  const selectedSeats = useSeatStore((state) => state.seats);
  const price = useMemo(() => {
    return Object.values(selectedSeats).reduce((acc, seat) => {
      return acc + (seat?.price || 0) - (seat?.discount || 0);
    }, 0);
  }, [selectedSeats]);
  return (
    <Section className="price-section mt-2 flex items-center justify-between">
      <h6 className="text-[20px] text-[var(--tg-theme-section-header-text-color)]">
        Summa
      </h6>
      <p className="text-[var(--text-confirm-color)]">
        {currencyFormat(price)} so'm
      </p>
    </Section>
  );
}

export default PriceSection;
