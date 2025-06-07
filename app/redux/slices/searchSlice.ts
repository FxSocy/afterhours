import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PokemonGeneration } from "~/components/pokemon/PokemonTypes";
import type { RootState } from "../store";

export interface SearchState {
  generation: PokemonGeneration;
}

const initialState: SearchState = {
  generation: PokemonGeneration.MODERN,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    switchGeneration: (state, action: PayloadAction<PokemonGeneration>) => {
      state.generation = action.payload;
    },
  },
});

export const { switchGeneration } = searchSlice.actions;

export const useGeneration = () =>
  useSelector((state: RootState) => state.search.generation);

export default searchSlice.reducer;
