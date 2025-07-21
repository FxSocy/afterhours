import styles from "./TypeChart.module.scss";

export enum PokemonGeneration {
  MODERN = "MODERN",
  GEN4 = "GEN4",
}

export type TypeEffectiveness = {
  name: string;
  immunes: string[];
  weaknesses: string[];
  strengths: string[];
};

export interface Pokemon {
  name: string;
  type: Array<PokemonTypes>;
}

export const PokemonTypeColors: any = {
  normal: styles.normal,
  fire: styles.fire,
  water: styles.water,
  electric: styles.electric,
  grass: styles.grass,
  ice: styles.ice,
  fighting: styles.fighting,
  poison: styles.poison,
  ground: styles.ground,
  flying: styles.flying,
  psychic: styles.psychic,
  bug: styles.bug,
  rock: styles.rock,
  ghost: styles.ghost,
  dragon: styles.dragon,
  dark: styles.dark,
  steel: styles.steel,
  fairy: styles.fairy,
};

export const effectivenessColors = (eff: number | string) => {
  switch (eff) {
    case "0":
    case 0:
      return { backgroundColor: styles.immune };
    case "0.25":
    case 0.25:
      return { backgroundColor: styles.doubleresisted };
    case "0.5":
    case 0.5:
      return { backgroundColor: styles.resisted };
    case "1":
    case 1:
      return { backgroundColor: styles.neutral, color: "#070707" };
    case "2":
    case 2:
      return { backgroundColor: styles.supereffective };
    case "4":
    case 4:
      return { backgroundColor: styles.doublesupereffective, color: "#070707" };
  }
  return "";
};

export enum PokemonTypes {
  normal = "normal",
  fire = "fire",
  water = "water",
  electric = "electric",
  grass = "grass",
  ice = "ice",
  fighting = "fighting",
  poison = "poison",
  ground = "ground",
  flying = "flying",
  psychic = "psychic",
  bug = "bug",
  rock = "rock",
  ghost = "ghost",
  dragon = "dragon",
  dark = "dark",
  steel = "steel",
  fairy = "fairy",
}
