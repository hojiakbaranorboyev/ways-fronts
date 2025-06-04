import { Wallet, Clock, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Do'stlar", icon: <UsersRound size={20} />, path: "/friends" },
  { label: "Buyurtmalar", icon: <Wallet size={20} />, path: "/orders" },
  { label: "History", icon: <Clock size={20} />, path: "/history" },
];

function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[var(--tg-theme-section-bg-color)] flex justify-around items-center py-2 z-50"
      style={{ boxShadow: "0 -1px 0 var(--tg-theme-section-separator-color)" }}
    >
      {navItems.map((item) => {
        return (
          <NavLink
            key={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs w-1/3 ${
                isActive
                  ? "text-[var(--tg-theme-text-color)]"
                  : "text-[var(--tg-theme-subtitle-text-color)]"
              }`
            }
            to={item.path}
            prefetch="viewport"
          >
            <div>{item.icon}</div>
            <span className="mt-1 font-medium text-sm">{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Footer;
