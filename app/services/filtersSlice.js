import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [], // Store selected categories here
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const categoryId = action.payload;
      if (state.selectedCategories.includes(categoryId)) {
        state.selectedCategories = state.selectedCategories.filter(id => id !== categoryId);
      } else {
        state.selectedCategories.push(categoryId);
      }
    },
    resetFilters: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { toggleCategory, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;