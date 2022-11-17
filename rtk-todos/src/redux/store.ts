import {
  Action,
  AnyAction,
  configureStore,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createSelectorHook } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { todoApi } from "./Features/Todos/todosApiSlice";

import createRootReducer from "./reducers";

export const useCustomSelector = createSelectorHook<RootState>();

// Adding the api middleware enables caching, invalidation, polling,
// and other useful features of `rtk-query`.
const MIDDLEWARE = new MiddlewareArray()
  .concat(thunk)
  .concat(todoApi.middleware);

const rootReducer = createRootReducer();

export const store = configureStore({
  reducer: rootReducer,
  middleware: MIDDLEWARE,
  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type RootThunk = ThunkAction<void, RootState, null, AnyAction>;
export type DispatchExts = ThunkDispatch<RootState, undefined, Action<any>>;
