import { Check } from "lucide-react";

interface IOption {
  id: string;
  name: string;
  details?: any;
}
interface IListSelection {
  selectedKeys: string[];
  options: IOption[];
  onChange: (item: IOption) => void;
}

export function ListSelection({ options, selectedKeys, onChange }: IListSelection) {
  return (
    <ul className="space-y-2">
      {options?.map((item) => (
        <li
          key={item.id}
          className={`d-flex align-items-center bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)] rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer text-lg 
          ${selectedKeys.includes(item.id) ? "bg-gray-600 text-white" : ""}`}
          onClick={() => onChange(item)}
        >
          <span>{item.name}</span>
          <span>
            {selectedKeys.includes(item.id) ? (
              <Check className="text-lime-500 font-bold" />
            ) : (
              ""
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}