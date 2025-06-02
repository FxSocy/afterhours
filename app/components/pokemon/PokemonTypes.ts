import styles from "./TypeChart.module.scss"

export type TypeEffectiveness = {
    name: string,
    immunes: string[],
    weaknesses: string[],
    strengths: string[]
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
    steel: styles.steel
}

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
    steel = "steel"
}
