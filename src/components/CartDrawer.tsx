import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">Cart</DrawerTitle>
            <DrawerDescription className="text-center">
              Make sure to apply the discount
            </DrawerDescription>
          </DrawerHeader>
          <CartItems cart={cart} setCart={setCart} />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Checkout</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
