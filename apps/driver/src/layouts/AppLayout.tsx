import { Clock, UsersRound, Wallet } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Footer } from "ui";

export default function AppLayout() {
  const navItems = [
    { label: "Do'stlar", icon: <UsersRound size={20} />, path: "/friends" },
    { label: "Buyurtmalar", icon: <Wallet size={20} />, path: "/orders" },
    { label: "History", icon: <Clock size={20} />, path: "/history" },
  ];
  return (
    <div className="flex flex-col h-screen text-white  bg-[var(--tg-theme-secondary-bg-color)]">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Fixed footer */}
      <Footer items={navItems} />
    </div>
  );
}
