import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./ReduxSlice/CategorySlice";
import branchSlice from "./ReduxSlice/BranchSlice";
import adminSlice from "./ReduxSlice/Adminslice";
import productSlice from "./ReduxSlice/ProductSlice";
import orderSlice from "./ReduxSlice/Orderslice"

export const store = configureStore({
  reducer: {
       category:CategorySlice,
       branches: branchSlice,
       admins:adminSlice,
       product:productSlice,
       order:orderSlice
  },
});
