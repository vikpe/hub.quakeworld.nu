import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => ({
  ui: {
    favorites: {
      players: [],
      servers: [],
    },
    filters: {
      keyword: "",
    },
  },
  entries: [],
});

export default createSlice({
  name: "form",
  initialState: getInitialState(),
  reducers: {
    updateEntries: (state, action) => {
      const { entries } = action.payload;
      state.entries = entries;
    },
    updateFilters: (state, action) => {
      const { values } = action.payload;
      state.ui.filters = values;
    },
  },
});
