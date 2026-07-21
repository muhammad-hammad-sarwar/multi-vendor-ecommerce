import { useEffect } from "react";
import { useAppDispatch } from "./hooks";

import {
  loadAdminProducts,
  loadAdminEvents,
  loadAdminOrders,
  loadAdminUsers,
  loadAdminSellers,
} from "../actions/admin";

export const useAdminInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAdminProducts());
    dispatch(loadAdminEvents());
    dispatch(loadAdminUsers());
    dispatch(loadAdminSellers());
    dispatch(loadAdminOrders());
  }, [dispatch]);
};
