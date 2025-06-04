import { FC, PropsWithChildren } from "react";

interface ISection extends React.ButtonHTMLAttributes<HTMLDivElement> {}
const Section: FC<PropsWithChildren<ISection>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`px-4 py-2 bg-[var(--tg-theme-section-bg-color)] rounded-[16px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Section;
