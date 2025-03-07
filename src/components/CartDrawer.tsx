import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";
import CartItems from "./CartItems";
import { useContext } from "react";
import { cartContext, CartContext } from "@/App";

export function CartDrawer() {
  const { cart } = useContext(cartContext) as CartContext;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 right-4">
          <FaCartShopping />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        {Object.keys(cart).length > 0 ? (
          <div className="mx-auto w-full max-w-sm overflow-auto p-4">
            <DrawerHeader>
              <DrawerTitle className="text-center">Cart</DrawerTitle>
              <DrawerDescription className="text-center">
                Make sure to apply the discount
              </DrawerDescription>
            </DrawerHeader>
            <CartItems />
            <Button className="w-full">Checkout</Button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-2xl">
            Your cart is empty
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
