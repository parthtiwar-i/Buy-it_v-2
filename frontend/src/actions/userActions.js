import axios from "axios";
import {
  CLEAR_ERROR,
  LOAD_USER_REQUEST,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants/userConstants";

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error,
    });
  }
};

//register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: err.response.data.error,
    });
  }
};

//load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err.response.data.error,
    });
  }
};

//logout user

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: err.response.data.error,
    });
  }
};


// Update  Users Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: err.response.data.error,
    });
  }
};


// Update  Users Password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/password/update`, password, config);
    
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data.error,
    });
  }
};

// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
