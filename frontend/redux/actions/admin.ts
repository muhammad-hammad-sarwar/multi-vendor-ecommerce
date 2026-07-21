import api from "@/axios/api";

import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  getSellersStart,
  getSellersSuccess,
  getSellersFailure,
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
} from "../slices/admin";

export const loadAdminProducts = () => async (dispatch: any) => {
  try {
    dispatch(getProductsStart());

    const { data } = await api.get("/admin/products");

    dispatch(getProductsSuccess(data.products));
  } catch (error: any) {
    dispatch(getProductsFailure(error.response?.data?.message));
  }
};

export const loadAdminEvents = () => async (dispatch: any) => {
  try {
    dispatch(getEventsStart());

    const { data } = await api.get("/admin/events");

    dispatch(getEventsSuccess(data.events));
  } catch (error: any) {
    dispatch(getEventsFailure(error.response?.data?.message));
  }
};

export const loadAdminUsers = () => async (dispatch: any) => {
  try {
    dispatch(getUsersStart());

    const { data } = await api.get("/admin/users");

    dispatch(getUsersSuccess(data.users));
  } catch (error: any) {
    dispatch(getUsersFailure(error.response?.data?.message));
  }
};

export const loadAdminSellers = () => async (dispatch: any) => {
  try {
    dispatch(getSellersStart());

    const { data } = await api.get("/admin/sellers");

    dispatch(getSellersSuccess(data.sellers));
  } catch (error: any) {
    dispatch(getSellersFailure(error.response?.data?.message));
  }
};

export const loadAdminOrders = () => async (dispatch: any) => {
  try {
    dispatch(getOrdersStart());

    const { data } = await api.get("/admin/orders");

    dispatch(getOrdersSuccess(data.orders));
  } catch (error: any) {
    dispatch(getOrdersFailure(error.response?.data?.message));
  }
};

export const deleteProduct = (id: string) => async (dispatch: any) => {
  try {
    dispatch(deleteProductStart());

    await api.delete(`/admin/products/${id}`);

    dispatch(deleteProductSuccess(id));
  } catch (error: any) {
    dispatch(
      deleteProductFailure(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};

export const deleteEvent = (id: string) => async (dispatch: any) => {
  try {
    console.log(id);
    dispatch(deleteEventStart());

    await api.delete(`/admin/events/${id}`);

    dispatch(deleteEventSuccess(id));
  } catch (error: any) {
    dispatch(
      deleteEventFailure(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
