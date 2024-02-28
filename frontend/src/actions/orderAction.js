import axios from "axios";
import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstant";

//Create new order
export const createOrder = (order) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//My Orders
export const myOrders = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: MY_ORDER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/order/me");

    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//Single Order Details

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/orders/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//all orders ADMIN

export const getAllOrders = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: ALL_ORDER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (err) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//update orders ADMIN

export const updateOrder = (id, order) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });
    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//delete order ADMIN

export const deleteOrder = (id) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: DELETE_ORDER_REQUEST,
    });


    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};
// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
