import { useEffect, useRef, useState } from "react";
import { productList } from "./utils/products";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Total from "./Components/Total";
import { FormattedNumber } from "react-intl";

type ProductDetails = {
  name: string;
  price: number;
  quantity: number;
};

export type Cart = {
  [key: number]: ProductDetails;
};

function App() {
  const [cart, setCart] = useState<Cart>({});
  const [discount, setDiscount] = useState<number | undefined>();
  const disip = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("Cart-Items");
    const discount = localStorage.getItem("Discount") ?? undefined;
    if (cartItems) {
      try {
        setCart(JSON.parse(cartItems));
      } catch (error) {
        console.log("Invalid cart data");
      }
    }
    if (discount) {
      setDiscount(parseInt(discount));
      disip.current!.value = discount;
    }
  }, []);

  return (
    <>
      <h1 className="w-full p-2 lg:p-4 bg-yellow-300 text-2xl lg:text-3xl font-bold text-center">
        Cart
      </h1>
      <div className="p-2">
        <div>
          <div className="border m-2 p-2 rounded flex flex-col gap-2 max-w-[720px] mx-auto">
            {productList.map((product) => {
              return (
                <div
                  key={product.id}
                  className="border p-4 flex items-center gap-2 lg:gap-4 justify-between bg-amber-50"
                >
                  <div>
                    <h1 className="font-semibold text-md lg:text-2xl">
                      <span className="font-medium text-sm lg:text-xl">
                        Name :{" "}
                      </span>{" "}
                      {product.name}
                    </h1>
                    <h1 className="font-semibold text-md lg:text-2xl">
                      {" "}
                      <span className="font-medium text-sm lg:text-xl">
                        Price :{" "}
                      </span>{" "}
                      <FormattedNumber
                        value={product.price}
                        style="currency"
                        currency="INR"
                        minimumFractionDigits={2}
                      />
                    </h1>
                  </div>
                  <div className="flex gap-1 lg:gap-2 border p-1 lg:p-2 rounded-xl items-center">
                    <button
                      className="active:bg-blue-200 p-1 lg:p-3 rounded-full"
                      onClick={() => {
                        if (!cart[product.id]) return;

                        const newCart = {
                          ...cart,
                          [product.id]: {
                            name: product.name,
                            price: product.price,
                            quantity: Math.max(
                              (cart[product.id]?.quantity ?? 0) - 1,
                              0
                            ),
                          },
                        };

                        if (newCart[product.id].quantity === 0)
                          delete newCart[product.id];

                        setCart(newCart);
                        localStorage.setItem(
                          "Cart-Items",
                          JSON.stringify(newCart)
                        );
                      }}
                    >
                      <FaMinusCircle />
                    </button>
                    <input
                      type="number"
                      className="font-semibold text-lg lg:text-2xl text-center outline-none w-6 lg:w-10"
                      value={cart[product.id]?.quantity ?? product.quantity}
                      onChange={(e) => {
                        const newCart = {
                          ...cart,
                          [product.id]: {
                            name: product.name,
                            price: product.price,
                            quantity: Number(e.target.value),
                          },
                        };
                        if (newCart[product.id].quantity === 0)
                          delete newCart[product.id];
                        setCart(newCart);
                        localStorage.setItem(
                          "Cart-Items",
                          JSON.stringify(newCart)
                        );
                      }}
                    />
                    <button
                      className="p-2 lg:p-4 active:bg-blue-200 rounded-full"
                      onClick={() => {
                        const newCart = {
                          ...cart,
                          [product.id]: {
                            name: product.name,
                            price: product.price,
                            quantity:
                              (cart[product.id]?.quantity ?? product.quantity) +
                              1,
                          },
                        };
                        setCart(newCart);
                        localStorage.setItem(
                          "Cart-Items",
                          JSON.stringify(newCart)
                        );
                      }}
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="max-w-[720px] mx-auto p-2 flex gap-2 lg:gap-4">
            <input
              type="number"
              min={0}
              max={100}
              placeholder="Enter your discount%"
              className="w-full border p-1 lg:p-2 border-collapse rounded text-lg lg:text-2xl font-semibold"
              ref={disip}
            />
            <button
              className="border p-2 rounded active:bg-amber-300 hover:bg-amber-200 italic"
              onClick={() => {
                const discount = Number(disip.current?.value);
                if (discount >= 0 && discount <= 100) {
                  setDiscount(discount);
                  localStorage.setItem("Discount", discount.toString());
                  return;
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
        <Total cart={cart} discount={discount} />
      </div>
    </>
  );
}

export default App;
