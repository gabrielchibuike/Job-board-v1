import { configureStore, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search payload",
  initialState: { value: { searchPayload: [] } },
  reducers: {
    searchPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const categorySlice = createSlice({
  name: "category payload",
  initialState: { value: { categoryPayload: [] } },
  reducers: {
    categoryPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const loadingSlice = createSlice({
  name: "isLoading",
  initialState: { value: { isLoading: false } },
  reducers: {
    isLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchPayload } = searchSlice.actions;
export const { categoryPayload } = categorySlice.actions;
export const { isLoading } = loadingSlice.actions;

export const store = configureStore({
  reducer: {
    searchResult: searchSlice.reducer,
    categoryResult: categorySlice.reducer,
    loadingState: loadingSlice.reducer,
  },
});
