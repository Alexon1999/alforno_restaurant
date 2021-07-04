import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const CommandeSlice = createSlice({
  name: "commande",
  initialState: {
    commentaire: "",
    methode_vente: "Livraison",
  },
  reducers: {
    changeMethodeVente(state, action) {
      state.methode_vente = action.payload;
    },

    changeCommentaire(state, action) {
      state.commentaire = action.payload;
    },

    resetCommandeState(state) {
      state.commentaire = "";
      state.methode_vente = "Livraison";
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const { changeMethodeVente, changeCommentaire, resetCommandeState } =
  CommandeSlice.actions;

// useSelector(state => state.Commande) :returns the state for Commande
export const selectCommande = (state) => state.commande;

// + the generated reducer function
export default CommandeSlice.reducer;
