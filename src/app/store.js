import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../features/authSlice";
import { notesApi } from "../services/notesApi";

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    auth: authSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
