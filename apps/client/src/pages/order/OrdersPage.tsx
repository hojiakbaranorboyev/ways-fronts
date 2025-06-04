import AddressSection from "pages/order/components/AddressSection/AddressSection";
import OrderConfirmation from "pages/order/components/OrderConfirmation/OrderConfirmation";
import PriceSection from "pages/order/components/PriceSection/PriceSection";
import SeatSection from "pages/order/components/SeatSection/SeatSection";
import TimeSection from "pages/order/components/TimeSection/TimeSection";
import UserInfoHeader from "pages/order/components/UserInfoHeader/UserInfoHeader";


export default function OrdersPage() {
  return (
    <div className="text-xl">
      <UserInfoHeader />
      <AddressSection />
      <SeatSection />
      <TimeSection />
      <PriceSection />
      <OrderConfirmation />
    </div>
  );
}
