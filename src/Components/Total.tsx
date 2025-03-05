import { FormattedNumber } from "react-intl";
import { Cart } from "../App";

function Total({
  cart,
  discount,
}: {
  cart: Cart;
  discount: number | undefined;
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
                <span className="text-lg lg:text-2xl flex justify-between">
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
          {discount !== undefined && discount > 0 && (
            <h3 className="text-lg lg:text-2xl flex justify-between">
              <span className="grow-[2]">Discount</span>
              <span>
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
          <h1 className="text-lg lg:text-2xl font-semibold flex justify-between">
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
