import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadUserProfile } from "../actions/user";

export const useInitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);
};
