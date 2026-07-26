import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getSellerConversations } from "../actions/conversations";

export const useSellerInbox = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerConversations());
  }, [dispatch]);
};
