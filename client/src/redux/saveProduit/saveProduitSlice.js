import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveProduits: [],
};

const saveSlice = createSlice({

  name: "saved_produits",
  initialState,
  
  reducers: {
    handleSave: (state, action) => {
      state.saveProduits.push(action.payload);
    },
    handleProduitRemove: (state, action) => {
      state.saveProduits = action.payload;
    },
    clearSavedProduit: (state) => {
      state.saveProduits = [];
    },
  },
});

export const { handleSave, handleProduitRemove,clearSavedProduit } = saveSlice.actions;

export default saveSlice.reducer;
