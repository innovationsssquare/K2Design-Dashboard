import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getallcategory,markOrderAsRead } from "../API/Order";

export const fetchorders = createAsyncThunk(
  "order/fetchorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategory();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const markOrderRead = createAsyncThunk(
  "order/markOrderRead",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await markOrderAsRead(orderId);
      return { orderId, data: response };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchorders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchorders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(fetchorders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      .addCase(markOrderRead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(markOrderRead.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { orderId } = action.payload;
        // Find the order in the state and mark it as read
        const existingOrder = state.order.find((order) => order._id === orderId);
        if (existingOrder) {
          existingOrder.readStatus = "read";
        }
      })
      .addCase(markOrderRead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default orderSlice.reducer;
