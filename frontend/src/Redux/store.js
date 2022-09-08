import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userReducer";
import plansReducer from "./plansReducer";

const store = configureStore({
  reducer: {
    user: usersReducer,
    plans: plansReducer,
  },
});

export default store;
