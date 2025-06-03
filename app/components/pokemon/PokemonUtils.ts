import typeEffectivenessData from "../../../config/pokemon_type_chart.json";
import type { PokemonTypes } from "./PokemonTypes";

export const typeData = () => {
  return typeEffectivenessData;
};

export const typeEffectiveness = (
  pType1: PokemonTypes,
  pType2?: PokemonTypes
) => {};
