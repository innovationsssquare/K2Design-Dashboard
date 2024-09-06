import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./ReduxSlice/CategorySlice";


export const store = configureStore({
  reducer: {
       category:CategorySlice
  },
});
