import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

const reducers = combineReducers({
  products: productReducer,
});
const initialState = {};
const middleware = [thunk];

const Store = configureStore(
  { reducer: reducers, preloadedState: initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
