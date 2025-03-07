import { Cart, Product } from "./Types";

export function removeHandler(
  product: Product,
  cart: Cart,
  setCart: (cart: Cart) => void
) {
  if (!cart[product.id]) return;

  const newCart = {
    ...cart,
    [product.id]: {
      name: product.name,
      price: product.price,
      quantity: Math.max((cart[product.id]?.quantity ?? 0) - 1, 0),
    },
  };

  if (newCart[product.id].quantity === 0) delete newCart[product.id];

  setCart(newCart);
  localStorage.setItem("Cart-Items", JSON.stringify(newCart));
}

export function addHandler(
  product: Product,
  cart: Cart,
  setCart: (cart: Cart) => void
) {
  const newCart = {
    ...cart,
    [product.id]: {
      name: product.name,
      price: product.price,
      quantity: (cart[product.id]?.quantity ?? product.quantity) + 1,
    },
  };
  setCart(newCart);
  localStorage.setItem("Cart-Items", JSON.stringify(newCart));
}

export function inputChangeHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  product: Product,
  cart: Cart,
  setCart: React.Dispatch<any>
) {
  const newCart = {
    ...cart,
    [product.id]: {
      name: product.name,
      price: product.price,
      quantity: Number(e.target.value),
    },
  };
  if (newCart[product.id].quantity === 0) delete newCart[product.id];
  setCart(newCart);
  localStorage.setItem("Cart-Items", JSON.stringify(newCart));
}
