import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesApi } from "../services/notesApi";

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authSlice.reducer,
    // shoppingBag: cartSlice.reducer,
    // order: orderSlice.reducer,

    // register: registerReducer,
    // login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
