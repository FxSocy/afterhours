import typeEffectivenessDataModern from "../../../config/pokemon_type_chart_modern.json";
import typeEffectivenessDataGen4 from "../../../config/pokemon_type_chart_gen4.json";
import pokemon_data_gen4 from "../../../config/pokemon_gen4.json";
import pokemon_data_modern from "../../../config/pokemon_modern.json";
import { PokemonGeneration, PokemonTypes, type Pokemon } from "./PokemonTypes";

export const typeData = (generation: PokemonGeneration) => {
  switch (generation) {
    case PokemonGeneration.MODERN:
      return typeEffectivenessDataModern;
    case PokemonGeneration.GEN4:
      return typeEffectivenessDataGen4;
  }
};

export const usePokemonData = (
  generation: PokemonGeneration
): Array<Pokemon> => {
  switch (generation) {
    case PokemonGeneration.MODERN:
      return pokemon_data_modern as Array<Pokemon>;
    case PokemonGeneration.GEN4:
      return pokemon_data_gen4 as Array<Pokemon>;
  }
};

export interface PokemonTypeEffectivenessType {
  normal: number;
  fire: number;
  water: number;
  electric: number;
  grass: number;
  ice: number;
  fighting: number;
  poison: number;
  ground: number;
  flying: number;
  psychic: number;
  bug: number;
  rock: number;
  ghost: number;
  dragon: number;
  dark: number;
  steel: number;
}

export interface EffectivenessType {
  immunes: Array<PokemonTypes>;
  doubleresisted: Array<PokemonTypes>;
  resisted: Array<PokemonTypes>;
  neutral: Array<PokemonTypes>;
  supereffective: Array<PokemonTypes>;
  doublesupereffective: Array<PokemonTypes>;
}

export const useTypeEffectiveness = (
  pType1?: PokemonTypes,
  generation: PokemonGeneration = PokemonGeneration.MODERN
): EffectivenessType => {
  const td: any = typeData(generation);
  const rsp: EffectivenessType = {
    immunes: [],
    doubleresisted: [],
    resisted: [],
    neutral: [],
    supereffective: [],
    doublesupereffective: [],
  };
  if (pType1 === undefined) return rsp;
  Object.entries(td[pType1]).forEach(([key, value]) => {
    switch (value) {
      case 0:
        rsp.immunes.push(key as PokemonTypes);
        break;
      case 0.25:
        rsp.doubleresisted.push(key as PokemonTypes);
        break;
      case 0.5:
        rsp.resisted.push(key as PokemonTypes);
        break;
      case 1:
        rsp.neutral.push(key as PokemonTypes);
        break;
      case 2:
        rsp.supereffective.push(key as PokemonTypes);
        break;
      case 4:
        rsp.doublesupereffective.push(key as PokemonTypes);
        break;
    }
  });
  return rsp;
};

export const useTypeDefensiveness = (
  pType1?: PokemonTypes,
  pType2?: PokemonTypes,
  generation: PokemonGeneration = PokemonGeneration.MODERN
): EffectivenessType => {
  const td: any = typeData(generation);
  const rsp: EffectivenessType = {
    immunes: [],
    doubleresisted: [],
    resisted: [],
    neutral: [],
    supereffective: [],
    doublesupereffective: [],
  };
  if (pType1 === undefined && pType2 === undefined) return rsp;
  Object.entries(td).forEach(([key, value]: any) => {
    const eff1 = pType1 ? value[pType1] : 1;
    const eff2 = pType2 ? value[pType2] : 1;
    const eff_comb = eff1 * eff2;
    switch (eff_comb) {
      case 0:
        rsp.immunes.push(key as PokemonTypes);
        break;
      case 0.25:
        rsp.doubleresisted.push(key as PokemonTypes);
        break;
      case 0.5:
        rsp.resisted.push(key as PokemonTypes);
        break;
      case 1:
        rsp.neutral.push(key as PokemonTypes);
        break;
      case 2:
        rsp.supereffective.push(key as PokemonTypes);
        break;
      case 4:
        rsp.doublesupereffective.push(key as PokemonTypes);
        break;
    }
  });
  return rsp;
};
