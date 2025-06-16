import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "./layouts/AppLayout";
import OrdersPage from "./pages/order/OrdersPage";
import HistoryPage from "./pages/history/HistoryPage";
import FriendPage from "./pages/friend/FriendPage";

declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/orders");
    document.body.style.height = innerHeight + "px";
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<OrdersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="friends" element={<FriendPage />} />
      </Route>
    </Routes>
  );
}

export default App;
