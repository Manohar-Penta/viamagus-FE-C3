import { createContext, useCallback, useEffect, useState } from "react";
import { productList } from "./utils/products";
import { FormattedNumber } from "react-intl";
import { Cart } from "./utils/Types";
import { addHandler, removeHandler } from "./utils/handler";
import { FaCartShopping } from "react-icons/fa6";
import { TiMinus, TiPlus } from "react-icons/ti";
import { CartDrawer } from "./components/CartDrawer";

export type CartContext = {
  cart: Cart;
  setCartHandler: (cart: Cart) => void;
};

export const cartContext = createContext<CartContext | undefined>(undefined);

function App() {
  const [cart, setCart] = useState<Cart>({});

  const setCartHandler = useCallback(
    (newCart: Cart) => {
      setCart(newCart);
      localStorage.setItem("Cart-Items", JSON.stringify(newCart));
    },
    [cart]
  );

  useEffect(() => {
    const cartItems = localStorage.getItem("Cart-Items");
    if (cartItems) {
      try {
        setCart(JSON.parse(cartItems));
      } catch (error) {
        console.log("Invalid cart data");
      }
    }
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCartHandler }}>
      <h1 className="w-full p-2 lg:p-4 bg-primary text-white text-2xl lg:text-3xl font-bold text-center">
        Products
      </h1>
      <div className="p-2">
        <div>
          <div className="m-2 p-2 rounded flex flex-col gap-3 max-w-[720px] mx-auto">
            {productList.map((product) => {
              return (
                <div
                  key={product.id}
                  className="border shadow rounded-lg p-4 flex items-center gap-2 lg:gap-4 justify-between"
                >
                  <img
                    src="/vite.svg"
                    alt=""
                    className="h-[75px] lg:h-[100px] bg-secondary p-2 rounded"
                  />
                  <div className="grow">
                    <h1 className="font-semibold text-md lg:text-lg px-4">
                      {product.name}
                    </h1>
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-sm px-4">
                        <FormattedNumber
                          value={product.price}
                          style="currency"
                          currency="INR"
                          maximumFractionDigits={0}
                        />
                      </h1>
                      {Object.keys(cart).find(
                        (item) => parseInt(item) == product.id
                      ) ? (
                        <div className="flex gap-1 border rounded-xl items-center">
                          <button
                            className="active:bg-blue-200 p-2 rounded-full"
                            onClick={() => {
                              removeHandler(product, cart, setCartHandler);
                            }}
                          >
                            <TiMinus color="#1ba672" />
                          </button>
                          <p className="font-semibold  lg:text-lg text-tertiary">
                            {cart[product.id]?.quantity ?? product.quantity}
                          </p>
                          <button
                            className="px-2 py-2 active:bg-blue-200 rounded-full"
                            onClick={() => {
                              addHandler(product, cart, setCartHandler);
                            }}
                          >
                            <TiPlus color="#1ba672" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="px-2 py-1 lg:px-4 text-tertiary font-semibold rounded flex gap-1 items-center border hover:scale-105 hover:shadow-2xl transition-all"
                          onClick={() => {
                            addHandler(product, cart, setCartHandler);
                          }}
                        >
                          <span>ADD</span>
                          <FaCartShopping color="#1ba672" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CartDrawer />
    </cartContext.Provider>
  );
}

export default App;
