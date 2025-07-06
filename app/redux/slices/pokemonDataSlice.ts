import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  PokemonGeneration,
  type Pokemon,
} from "~/components/pokemon/PokemonTypes";
import { pokemon_gen4 } from "config/pokemon_gen4";
import { pokemon_modern } from "config/pokemon_modern";
import { useShallowEqualSelector } from "../store";

export interface PokemonDataState {
  gen4: Array<Pokemon>;
  modern: Array<Pokemon>;
}

const initialState: PokemonDataState = {
  gen4: pokemon_gen4,
  modern: pokemon_modern,
};

export const pokemonDataSlice = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {},
});

export const {} = pokemonDataSlice.actions;

export const usePokemonData = (gen: PokemonGeneration): Array<Pokemon> => {
  const gen4 = useShallowEqualSelector((state) => state.pokemonData.gen4);
  const modern = useShallowEqualSelector((state) => state.pokemonData.modern);
  switch (gen) {
    case PokemonGeneration.MODERN:
      return modern;
    case PokemonGeneration.GEN4:
      return gen4;
  }
};

export default pokemonDataSlice.reducer;
