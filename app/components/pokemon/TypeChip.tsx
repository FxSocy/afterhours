import { PokemonTypeColors, type PokemonTypes } from "./PokemonTypes";
import styles from "./TypeChart.module.scss";

export const TypeChipButton = ({
  pokemonType,
  handleOnClick,
}: {
  pokemonType: PokemonTypes;
  handleOnClick?: () => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: PokemonTypeColors[pokemonType],
      }}
      className={styles.typechipbutton}
      onClick={() => handleOnClick && handleOnClick()}
    >
      {pokemonType.toUpperCase()}
    </div>
  );
};

export const TypeChip = ({
  pokemonType,
  width = "80px",
  height = "40px",
  fontSize = "12px",
}: {
  pokemonType: PokemonTypes;
  width?: string;
  height?: string;
  fontSize?: string;
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: PokemonTypeColors[pokemonType],
        fontSize: fontSize,
      }}
      className={styles.typechip}
    >
      {pokemonType.toUpperCase()}
    </div>
  );
};
