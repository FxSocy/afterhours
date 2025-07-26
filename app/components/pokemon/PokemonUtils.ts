import typeEffectivenessDataModern from "../../../config/pokemon_type_chart_modern.json";
import typeEffectivenessDataGen4 from "../../../config/pokemon_type_chart_gen4.json";
import { PokemonGeneration, PokemonTypes, type Pokemon } from "./PokemonTypes";
import type { TypeGameRound } from "~/redux/slices/typeGameSlice";
import {
  blankTypeEffectivenessMap,
  type TypeEffectivenessMap,
  type UserSingleTypeOptions,
} from "./type_matchup_game/RunGame";

export const typeData = (generation: PokemonGeneration) => {
  switch (generation) {
    case PokemonGeneration.MODERN:
      return typeEffectivenessDataModern;
    case PokemonGeneration.GEN4:
      return typeEffectivenessDataGen4;
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
): EffectivenessType => generateTypeEffectiveness(pType1, generation);

export const generateTypeEffectiveness = (
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
  if (pType1 === undefined || !td[pType1]) return rsp;
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

export const generateTypeEffectivenessMap = (
  pType1?: PokemonTypes,
  generation: PokemonGeneration = PokemonGeneration.MODERN
): TypeEffectivenessMap => {
  const td: any = typeData(generation);
  const rsp: TypeEffectivenessMap = { ...blankTypeEffectivenessMap };
  if (pType1 === undefined || !td[pType1]) return rsp;
  Object.entries(td[pType1]).forEach(([key, value]) => {
    rsp[key as keyof TypeEffectivenessMap] =
      `${value}` as UserSingleTypeOptions;
  });
  return rsp;
};

export const useTypeDefensiveness = (
  pType1?: PokemonTypes,
  pType2?: PokemonTypes,
  generation: PokemonGeneration = PokemonGeneration.MODERN
): EffectivenessType => generateTypeDefensiveness(pType1, pType2, generation);

export const generateTypeDefensiveness = (
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

export const generateTypeDefensivenessMap = (
  pType1?: PokemonTypes,
  pType2?: PokemonTypes,
  generation: PokemonGeneration = PokemonGeneration.MODERN
): TypeEffectivenessMap => {
  const td: any = typeData(generation);
  const rsp: TypeEffectivenessMap = { ...blankTypeEffectivenessMap };
  if (pType1 === undefined && pType2 === undefined) return rsp;
  Object.entries(td).forEach(([key, value]: any) => {
    const eff1 = pType1 ? value[pType1] : 1;
    const eff2 = pType2 ? value[pType2] : 1;
    const eff_comb = eff1 * eff2;
    rsp[key as keyof TypeEffectivenessMap] =
      `${eff_comb}` as UserSingleTypeOptions;
  });
  return rsp;
};

// export const GenerateCompleteGameState = (): Array<TypeGameRound> => {
//   return Object.keys(PokemonTypes).map((type) => {
//     return {
//       correctAnswer: {
//         offense: generateTypeEffectivenessMap(type as PokemonTypes),
//         defense: generateTypeDefensivenessMap(type as PokemonTypes),
//       },
//       type: type as PokemonTypes,
//       userAnswer: {
//         offense: { ...blankTypeEffectivenessMap },
//         defense: { ...blankTypeEffectivenessMap },
//       },
//       reportCard: undefined,
//     };
//   });
// };

export const pokemonTypeArray: Array<PokemonTypes> = [
  PokemonTypes.normal,
  PokemonTypes.fire,
  PokemonTypes.water,
  PokemonTypes.electric,
  PokemonTypes.grass,
  PokemonTypes.ice,
  PokemonTypes.fighting,
  PokemonTypes.poison,
  PokemonTypes.ground,
  PokemonTypes.flying,
  PokemonTypes.psychic,
  PokemonTypes.bug,
  PokemonTypes.rock,
  PokemonTypes.ghost,
  PokemonTypes.dragon,
  PokemonTypes.dark,
  PokemonTypes.steel,
  PokemonTypes.fairy,
];

export const generateRandomGameRound = (): TypeGameRound => {
  const pt =
    pokemonTypeArray[Math.floor(Math.random() * pokemonTypeArray.length)];
  const off_def = Math.floor(Math.random() * 2);
  return {
    roundType: off_def === 0 ? "OFFENSE" : "DEFENSE",
    pokemonType: pt,
    correctAnswer:
      off_def === 0
        ? generateTypeEffectivenessMap(pt)
        : generateTypeDefensivenessMap(pt),
  };
};
