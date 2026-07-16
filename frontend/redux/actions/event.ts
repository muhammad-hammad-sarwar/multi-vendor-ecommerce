import api from "@/axios/api";
import {
  deleteSellerEventFailure,
  deleteSellerEventStart,
  deleteSellerEventSuccess,
  getAllEventsFailure,
  getAllEventsStart,
  getAllEventsSuccess,
  getSellerEventsFailure,
  getSellerEventsStart,
  getSellerEventsSuccess,
  IEvent,
} from "../slices/events";
import { AppDispatch } from "../store";

export const loadSellerEvents = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getSellerEventsStart());
    const res = await api.get("/shop/events");
    dispatch(getSellerEventsSuccess(res.data.events as Event[]));
  } catch (error) {
    dispatch(getSellerEventsFailure(error?.response?.data?.message));
  }
};

export const deleteSellerEvent = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deleteSellerEventStart());
    const res = await api.delete(`/shop/events/${id}`);
    dispatch(deleteSellerEventSuccess(res.data.events as Event[]));
  } catch (error) {
    dispatch(deleteSellerEventFailure(error?.response?.data?.message));
  }
};

export const loadAllEvents = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAllEventsStart());
    const res = await api.get("/events");
    dispatch(getAllEventsSuccess(res.data.events as IEvent[]));
  } catch (error) {
    dispatch(getAllEventsFailure(error?.response?.data?.message));
  }
};
