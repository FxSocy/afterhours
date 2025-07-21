import { configureStore } from "@reduxjs/toolkit";

import {
  shallowEqual,
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import searchReducer from "../redux/slices/searchSlice";
import dataReducer from "../redux/slices/pokemonDataSlice";
import typeGameReducer from "../redux/slices/typeGameSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    pokemonData: dataReducer,
    typeGame: typeGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useShallowEqualSelector: TypedUseSelectorHook<RootState> = (
  selector
) => useSelector(selector, shallowEqual);
