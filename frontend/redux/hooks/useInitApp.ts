import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadShop, loadUserProfile } from "../actions/user";
import { loadAllProducts } from "../actions/product";

export const useInitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllProducts());
    dispatch(loadUserProfile());
    dispatch(loadShop());
  }, [dispatch]);
};
