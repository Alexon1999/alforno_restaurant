import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const InfoRestaurantSlice = createSlice({
  name: "infoRestaurant",
  initialState: {
    data: null,
  },
  reducers: {
    addInfo(state, action) {
      state.data = action.payload;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const { addInfo } = InfoRestaurantSlice.actions;

// useSelector(state => state.InfoRestaurant) :returns the state for InfoRestaurant
export const selectInfoRestaurant = (state) => state.infoRestaurant;

// + the generated reducer function
export default InfoRestaurantSlice.reducer;
