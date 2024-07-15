import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "./alertSlice";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  items: [],
  itemSaved: false,
  loading: false,
  error: null,
  isDialogOpen: false,
  selectedItem: null,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get("items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          severity: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const createItem = createAsyncThunk(
  "items/createItem",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post("items", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        showAlert({ message: "Item added successfully!!", severity: "success" })
      );
      return data;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          severity: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, item }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.put(`items/${id}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        showAlert({
          message: "Item updated successfully!",
          severity: "success",
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          severity: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        showAlert({
          message: "Item deleted successfully!",
          severity: "success",
        })
      );
      return id;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          severity: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    handleDialog: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    setItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchItems.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(createItem.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item._id === payload._id);
        state.items[index] = payload;
      })
      .addCase(updateItem.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== payload);
      })
      .addCase(deleteItem.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { handleDialog, setItem } = itemSlice.actions;
export default itemSlice.reducer;
