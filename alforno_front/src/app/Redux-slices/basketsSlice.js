import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const basketsSlice = createSlice({
  name: "baskets",
  initialState: {
    produits: [],
    menus: [],
  },
  reducers: {
    incrementQauntite: (state, action) => {
      if (!action.payload.isMenu) {
        const productIdx = state.produits.findIndex(
          (product) => product.id === action.payload.id
        );
        if (productIdx !== -1) {
          state.produits[productIdx].quantite++;
        }
      } else {
        const menuIdx = state.menus.findIndex(
          (menu) => menu.id === action.payload.id
        );

        if (menuIdx !== -1) {
          state.menus[menuIdx].quantite++;
        }
      }
    },
    decrementQauntite: (state, action) => {
      if (!action.payload.isMenu) {
        const productIdx = state.produits.findIndex(
          (product) => product.id === action.payload.id
        );

        if (productIdx !== -1) {
          if (state.produits[productIdx].quantite === 1) {
            state.produits.splice(productIdx, 1);
          } else {
            state.produits[productIdx].quantite--;
          }
        }
      } else {
        const menuIdx = state.menus.findIndex(
          (menu) => menu.id === action.payload.id
        );

        if (menuIdx !== -1) {
          if (state.menus[menuIdx].quantite === 1) {
            state.menus.splice(menuIdx, 1);
          } else {
            state.menus[menuIdx].quantite--;
          }
        }
      }
    },

    addProduct: (state, action) => {
      const productIdx = state.produits.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIdx !== -1) {
        // const quantite = state[productIdx].quantite + action.payload.quantite;
        // state.splice(productIdx, 1, {
        //   ...action.payload,
        //   quantite,
        // });
        const product = state.produits[productIdx];
        product.quantite += action.payload.quantite;
      } else {
        state.produits.push(action.payload);
      }
    },

    addMenu: (state, action) => {
      state.menus.push(action.payload);
    },

    emptyBasket: (state) => {
      state.produits.length = 0;
      state.menus.length = 0;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const {
  incrementQauntite,
  decrementQauntite,
  incrementByAmount,
  addProduct,
  addMenu,
  emptyBasket,
} = basketsSlice.actions;

// useSelector(state => state.baskets) :returns the state for baskets
export const selectBaskets = (state) => state.baskets;

// + the generated reducer function
export default basketsSlice.reducer;
