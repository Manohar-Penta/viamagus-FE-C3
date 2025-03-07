export type ProductDetails = {
  name: string;
  price: number;
  quantity: number;
};

export type Cart = {
  [key: number]: ProductDetails;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
