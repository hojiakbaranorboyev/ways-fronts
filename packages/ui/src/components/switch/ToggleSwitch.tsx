// import { useSeatStore } from "store/useSeatStore";
// import { currencyFormat } from "utils/currencyFormat";

import { ReactNode } from "react";

type IProps = {
  // seat: "front" | "backLeft" | "backMiddle" | "backRight";
  label: string | ReactNode;
  desc?: string | ReactNode;
  isOn: boolean;
  onClick: () => void;
  // price: number;
  // discount?: number;
};

export function ToggleSwitch({ label, desc, isOn, onClick }: IProps) {
  return (
    <div
      className="switch flex items-center justify-between mb-2 pb-2 border-b-[1px] border-[var(--tg-theme-bg-color)]"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <h6 className="text-[18px] text-[var(--tg-theme-text-color)]">
          {label}
        </h6>
        {desc && (
          <p className="text-sm text-[var(--tg-theme-subtitle-text-color)]">
            {desc}
          </p>
        )}
      </div>

      <div
        className={`w-15 h-8 flex items-center rounded-full cursor-pointer px-1 transition-colors
          ${
            isOn ? "bg-purple-600" : "bg-[var(--tg-theme-subtitle-text-color)]"
          }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform
            ${isOn ? "translate-x-7" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
}

export default ToggleSwitch;
