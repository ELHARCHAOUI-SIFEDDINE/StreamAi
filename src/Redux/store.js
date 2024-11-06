import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./sliceMovie";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
