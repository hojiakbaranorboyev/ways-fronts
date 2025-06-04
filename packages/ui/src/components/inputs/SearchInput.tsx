import { X, Search as SearchIcon } from "lucide-react";
import { useRef, useState, ReactNode, InputHTMLAttributes } from "react";
import "./style.scss";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  placeholder?: string;
  value: string;
  showClear?: boolean;
  className?: string;
  icon?: ReactNode;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLInputElement>) => void;
}

export function SearchInput({
  placeholder = "Search",
  value,
  showClear = true,
  className = "",
  icon = <SearchIcon size={18} />,
  onChange,
  onClear,
  onFocus,
  onBlur,
  onClick,
  ...props
}: SearchInputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative w-full rounded-md tx search-input ${
        isFocus ? "outline-2" : value ? "outline-2" : "outline"
      } outline-[var(--tg-theme-text-color)] ${isFocus ? "active-input" : ""} ${
        isFocus || value ? "focused-input" : ""
      } ${className}`}
      onClick={(e) => {
        inputRef.current?.focus();
        onClick?.(e);
      }}
    >
      <label
        className={`search-input-label bg ${
          isFocus || value ? "text-sm" : "text-lg"
        }`}
      >
        {placeholder}
      </label>

      <div className="flex items-center px-3 rounded-md bg-[var(--tg-card)] transition-colors text-[var(--tg-theme-text-color)]">
        <div
          className={`mr-2 flex items-center ${
            isFocus
              ? "text-[var(--tg-theme-accent-text-color)]"
              : "text-[var(--tg-theme-subtitle-text-color)]"
          }`}
        >
          {icon}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={(e) => {
            onFocus?.(e);
            setIsFocus(true);
          }}
          onBlur={() => {
            onBlur?.();
            setIsFocus(false);
          }}
          className="peer w-full bg-transparent outline-none placeholder-transparent text-lg"
          {...props}
          // readOnly
          // disabled
        />

        {showClear && value && (
          <X
            size={20}
            className="ml-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();

              if (onClear) onClear();
              else onChange("");
            }}
          />
        )}
      </div>
    </div>
  );
}
