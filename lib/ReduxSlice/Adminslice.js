import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getadminbybranch } from "../API/Auth";

// Define the async thunk
export const fetchAdmins = createAsyncThunk(
    "branches/fetchBranches",
    async (branchid, { rejectWithValue }) => {
      try {
        const response = await Getadminbybranch(branchid);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  



const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    status: "idle",
    openadmin:false,
    error: null,
  },
  reducers: {
    setBranchError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setSelectedBranch: (state, action) => {
      state.selectedBranchId = action.payload;
    },
    Setopenadmin(state, action) {
      state.openadmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branches = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { setBranchError,setSelectedBranch,Setopenadmin } = branchSlice.actions;

export default adminSlice.reducer;
