// import { useSeatStore } from "store/useSeatStore";
// import { currencyFormat } from "utils/currencyFormat";

type Props = {
  seat: "front" | "backLeft" | "backMiddle" | "backRight";
  label: string;
  price: number;
  discount?: number;
};

export function ToggleSwitch({ seat, label, price, discount }: Props) {
  // const isOn = useSeatStore((state) => state.seats[seat]?.isOn);
  // const toggleSeat = useSeatStore((state) => state.toggleSeat);
  return <></>;
  // return (
  //   <div
  //     className="switch flex items-center justify-between mb-2 pb-2 border-b-[1px] border-[var(--tg-theme-bg-color)]"
  //     onClick={() =>
  //       toggleSeat({ type: seat, discount: discount || 0, price, isOn: !isOn })
  //     }
  //   >
  //     <div className="flex flex-col">
  //       <h6 className="text-[18px] text-[var(--tg-theme-text-color)]">
  //         {label}
  //       </h6>
  //       {price && (
  //         <p className="text-sm text-[var(--tg-theme-subtitle-text-color)]">
  //           {currencyFormat(price)} so'm
  //           {discount ? ` - (${currencyFormat(discount)} so'm)` : null}
  //         </p>
  //       )}
  //     </div>

  //     <div
  //       className={`w-15 h-8 flex items-center rounded-full cursor-pointer px-1 transition-colors
  //         ${
  //           isOn ? "bg-purple-600" : "bg-[var(--tg-theme-subtitle-text-color)]"
  //         }`}
  //     >
  //       <div
  //         className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform
  //           ${isOn ? "translate-x-7" : "translate-x-0"}`}
  //       />
  //     </div>
  //   </div>
  // );
}

export default ToggleSwitch;
