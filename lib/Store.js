import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./ReduxSlice/CategorySlice";
import branchSlice from "./ReduxSlice/BranchSlice";
import adminSlice from "./ReduxSlice/Adminslice";

export const store = configureStore({
  reducer: {
       category:CategorySlice,
       branches: branchSlice,
       admins:adminSlice
  },
});
