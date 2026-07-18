import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadSellerProducts } from "../actions/product";
import { loadSellerEvents } from "../actions/event";
import { getAllOrders } from "../actions/order";
export const useSellerInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSellerProducts());
    dispatch(loadSellerEvents());
    dispatch(getAllOrders(true));
  }, [dispatch]);
};
