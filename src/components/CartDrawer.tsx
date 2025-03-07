import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Cart } from "@/utils/Types";
import { FaCartShopping } from "react-icons/fa6";
import CartItems from "./CartItems";

export function CartDrawer({
  cart,
  setCart,
}: {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 right-4">
          <FaCartShopping />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <div className="mx-auto w-full max-w-sm overflow-auto p-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">Cart</DrawerTitle>
            <DrawerDescription className="text-center">
              Make sure to apply the discount
            </DrawerDescription>
          </DrawerHeader>
          <CartItems cart={cart} setCart={setCart} />
          <Button className="w-full">Checkout</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
