import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadShop, loadUserProfile } from "../actions/user";
import { loadAllProducts } from "../actions/product";
import { setWishlist } from "../slices/wishlist";
import { setCartItems } from "../slices/cart";
import { loadAllEvents } from "../actions/event";

export const useInitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    dispatch(setWishlist(wishlist));

    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch(setCartItems(cart));

    dispatch(loadAllProducts());
    dispatch(loadAllEvents());
    dispatch(loadUserProfile());
    dispatch(loadShop());
  }, [dispatch]);
};
