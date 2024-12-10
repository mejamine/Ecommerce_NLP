import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {username:"user",role:"user"},
  loading: false,
  error: null,
  myArray: [],
  orders: [], 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loddingStart: (state) => {
      state.loading = true;
    },
    

    // Handle produit SAVED ITEMS
    handleSave: (state, action) => {
      state.savedProduit.push(action.payload);
    },
    handleProduitRemove: (state, action) => {
      state.savedProduit = action.payload;
    },
    updateArray: (state, action) => {
      state.myArray = action.payload;
    },
    deleteArray: (state) => {
      state.myArray = [];
    },
  },
});

export const {
  loddingStart,
  handleSave,
  handleProduitRemove,
  updateArray,
  deleteArray,
} = userSlice.actions;

export default userSlice.reducer;
