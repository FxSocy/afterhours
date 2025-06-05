import typeEffectivenessData from "../../../config/pokemon_type_chart.json";
import pokemon_data from "../../../config/pokemon.json"
import { PokemonTypes, type Pokemon } from "./PokemonTypes";

export const typeData = () => {
  return typeEffectivenessData;
};

export const usePokemonData = (): Array<Pokemon> => {
  return pokemon_data as Array<Pokemon>
}


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
  pType1?: PokemonTypes
): EffectivenessType => {
  const td: any = typeData();
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
  pType2?: PokemonTypes
): EffectivenessType => {
  const td: any = typeData();
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
