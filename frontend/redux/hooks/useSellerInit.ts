import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadSellerProducts } from "../actions/product";
export const useSellerInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSellerProducts());
  }, [dispatch]);
};
