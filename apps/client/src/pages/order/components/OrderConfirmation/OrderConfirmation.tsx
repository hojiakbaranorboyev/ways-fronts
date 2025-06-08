import { RippleButton } from "ui";

function OrderConfirmation() {
  return (
    <div className="cursor-pointer pb-[70px] pt-2 px-2">
      <RippleButton disabled onClick={() => console.log("Clicked!")}>
        Buyurtma berish
      </RippleButton>
    </div>
  );
}

export default OrderConfirmation;
