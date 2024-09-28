import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getallcategory, Getallcategorybyslug } from "../API/Category";

export const fetchcategories = createAsyncThunk(
  "category/fetchcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchcategoriesbyslug = createAsyncThunk(
  "category/fetchcategoriesbyslug",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategorybyslug();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categoryslug: [],
    status: "idle",
openaproduct:false,
    error: null,
  },
  reducers: { Setopenproduct(state, action) {
    state.openaproduct = action.payload;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchcategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchcategoriesbyslug.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategoriesbyslug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryslug = action.payload;
      })
      .addCase(fetchcategoriesbyslug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { Setopenproduct } = categorySlice.actions;


export default categorySlice.reducer;
