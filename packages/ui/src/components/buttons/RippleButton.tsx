import { ButtonHTMLAttributes, MouseEvent, useRef } from "react";
import "./ripple.css"; // We'll create this for animation

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function RippleButton({
  children,
  onClick,
  className = "",
  ...props
}: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = btnRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button!.clientWidth, button!.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button!.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button!.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button!.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button!.appendChild(circle);
  };

  return (
    <button
      ref={btnRef}
      onClick={(e) => {
        createRipple(e);
        onClick?.();
      }}
      className={`relative overflow-hidden cursor-pointer my-2 w-full rounded py-3 font-medium transition-all duration-200 
        bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
