import { configureStore } from "@reduxjs/toolkit";

import { shallowEqual, useSelector } from "react-redux";
import searchReducer from "../redux/slices/searchSlice";
import dataReducer from "../redux/slices/pokemonDataSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    pokemonData: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useShallowEqualSelector = (selector: (state: RootState) => any) =>
  useSelector(selector, shallowEqual);
