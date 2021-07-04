import { combineReducers } from "@reduxjs/toolkit";

import basketsReducer from "../Redux-slices/basketsSlice";
import alertsReducer from "../Redux-slices/alertsSlice";
import adminReducer from "../Redux-slices/adminSlice";
import commandeReducer from "../Redux-slices/commandeSlice";
import infoRestaurantReducer from "../Redux-slices/infoRestaurantSlice";

export default combineReducers({
  baskets: basketsReducer,
  alerts: alertsReducer,
  admin: adminReducer,
  commande: commandeReducer,
  infoRestaurant: infoRestaurantReducer,
});
