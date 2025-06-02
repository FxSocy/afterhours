import { PokemonTypeColors, type PokemonTypes } from "./PokemonTypes"
import styles from "./TypeChart.module.scss"

export const TypeChip = ({ pokemonType }: { pokemonType: PokemonTypes }) => {
    return (
        <div style={{ backgroundColor: PokemonTypeColors[pokemonType] }} className={styles.typechip}>
            {pokemonType.toUpperCase()}
        </div>)
}