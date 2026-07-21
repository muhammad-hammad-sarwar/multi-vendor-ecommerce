import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getConversations } from "../actions/conversations";
export const useConversationInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);
};
