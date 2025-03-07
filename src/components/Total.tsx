import { Cart } from "@/utils/Types";
import { FormattedNumber } from "react-intl";

function Total({
  cart,
  discount,
  setCart,
}: {
  cart: Cart;
  discount: number | undefined;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) {
  return (
    <>
      {Object.keys(cart).length > 0 && (
        <div
          className={
            "border m-2 p-4 lg:p-6 rounded flex flex-col gap-2 max-w-[720px] mx-auto transition-all duration-300 ease-in-out"
          }
        >
          {Object.keys(cart).map((id: string) => {
            return (
              <h3 key={id}>
                <span className="text-sm lg:text-md flex justify-between">
                  <span className="grow">
                    {cart[Number(id)].name} x {cart[Number(id)].quantity}
                  </span>{" "}
                  <span>
                    <FormattedNumber
                      value={cart[Number(id)].price * cart[Number(id)].quantity}
                      style="currency"
                      currency="INR"
                    />
                  </span>
                </span>
              </h3>
            );
          })}
          <hr />
          <h1 className="text-md lg:text-lg flex justify-between">
            Sub Total
            <span>
              <FormattedNumber
                value={Object.keys(cart).reduce((acc, id) => {
                  return (
                    acc + cart[Number(id)].price * cart[Number(id)].quantity
                  );
                }, 0)}
                style="currency"
                currency="INR"
              />
            </span>
          </h1>
          {discount && discount > 0 && (
            <h3 className="text-md lg:text-lg flex justify-between text-tertiary italic">
              <span className="grow">Discount</span>
              <span>
                -
                <FormattedNumber
                  value={
                    Object.keys(cart).reduce(
                      (acc, id) =>
                        acc +
                        cart[Number(id)].price * cart[Number(id)].quantity,
                      0
                    ) *
                    (discount / 100)
                  }
                  style="currency"
                  currency="INR"
                />
              </span>
            </h3>
          )}
          <hr />
          <h1 className="text-lg lg:text-xl font-semibold flex justify-between">
            Sub Total
            <span>
              <FormattedNumber
                value={Object.keys(cart).reduce(
                  (acc, id) =>
                    acc +
                    (cart[Number(id)].price *
                      cart[Number(id)].quantity *
                      (100 - (discount ?? 0))) /
                      100,
                  0
                )}
                style="currency"
                currency="INR"
              />
            </span>
          </h1>
        </div>
      )}
    </>
  );
}

export default Total;
