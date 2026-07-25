import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getConversations } from "../actions/conversations";

export const useSellerInbox = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);
};
