import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword : forgotPasswordReducer
});
const initialState = {};
const middleware = [thunk];

const Store = configureStore(
  { reducer: reducers, preloadedState: initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
