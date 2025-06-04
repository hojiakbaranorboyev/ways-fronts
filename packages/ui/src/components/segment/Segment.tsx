import { useEffect, useRef, useState } from "react";

type Segment = {
  label: string;
  value: string;
};

type Props = {
  options: Segment[];
  active: string;
  onChange: (value: string) => void;
};

export default function SegmentedSwitch({ options, active, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const index = options.findIndex((o) => o.value === active);
    const item = buttonRefs.current[index];

    if (item) {
      // Wait for layout
      requestAnimationFrame(() => {
        setActiveStyle({
          left: item.offsetLeft,
          width: item.offsetWidth,
        });
      });
    }
  }, [active, options]);

  return (
    <div
      ref={containerRef}
      className="relative flex px-1 p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-full w-max gap-1"
    >
      {/* Active background pill */}
      <span
        className="absolute top-1 left-0 h-[calc(100%-0.5rem)] bg-gray-600 rounded-full z-0 transition-all duration-300"
        style={{
          width: `${activeStyle.width}px`,
          left: `${activeStyle.left}px`,
        }}
      />
      {options.map((opt, idx) => (
        <button
          key={opt.value}
          ref={(el: any) => (buttonRefs.current[idx] = el)}
          onClick={() => onChange(opt.value)}
          className={`relative z-15 px-10 py-1.5 text-sm rounded-full transition-all font-medium ${
            active === opt.value
              ? "text-white"
              : "text-[var(--tg-theme-text-color)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
