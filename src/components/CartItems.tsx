import { useEffect, useRef, useState } from "react";
import Total from "./Total";
import { Cart } from "@/utils/Types";

function CartItems({
  cart,
  setCart,
}: {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) {
  const [discount, setDiscount] = useState<number | undefined>();
  const disip = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const discount = localStorage.getItem("Discount") ?? undefined;
    if (discount) {
      setDiscount(parseInt(discount));
      if (disip.current) disip.current.value = discount;
    }
  }, []);

  return (
    <>
      <div className="flex px-4 gap-2 items-center">
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Enter your discount%"
          className="border p-1 px-4 rounded lg:text-lg grow"
          ref={disip}
        />
        <button
          className="border px-2 h-fit py-1 rounded active:bg-primary hover:bg-secondary active:text-white italic"
          onClick={() => {
            const discount = Number(disip.current?.value ?? 0);
            if (discount > 0 && discount <= 100) {
              setDiscount(discount);
              localStorage.setItem("Discount", discount.toString());
              return;
            }
            setDiscount(undefined);
            localStorage.removeItem("Discount");
            if (disip.current) disip.current.value = "";
          }}
        >
          Apply
        </button>
      </div>
      {discount && (
        <p className="text-tertiary px-4 py-1 italic">
          {discount}% discount applied!!
        </p>
      )}
      <Total cart={cart} discount={discount} setCart={setCart} />
    </>
  );
}

export default CartItems;
