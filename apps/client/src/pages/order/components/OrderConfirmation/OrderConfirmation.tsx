import { RippleButton } from "ui";

function OrderConfirmation() {
  return (
    <div className="cursor-pointer">
      <RippleButton disabled onClick={() => console.log("Clicked!")}>
        Buyurtma berish
      </RippleButton>
    </div>
  );
}

export default OrderConfirmation;
