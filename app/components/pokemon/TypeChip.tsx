import { useMemo } from "react";
import {
  effectivenessColors,
  PokemonTypeColors,
  type PokemonTypes,
} from "./PokemonTypes";
import styles from "./TypeChart.module.scss";

export const TypeChipButton = ({
  width = "80px",
  height = "40px",
  fontSize = "12px",
  pokemonType,
  handleOnClick,
}: {
  width?: string;
  height?: string;
  fontSize?: string;
  pokemonType: PokemonTypes;
  handleOnClick?: () => void;
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: PokemonTypeColors[pokemonType],
        fontSize: fontSize,
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

export const EffectivenessChip = ({
  eff,
  selected,
  handleClick,
  useTextLabel = false,
}: {
  eff: number | string;
  selected?: boolean;
  handleClick?: () => void;
  useTextLabel?: boolean;
}) => {
  const formattedOutput = useMemo(() => {
    switch (eff) {
      case "0":
      case 0:
        return "immune";
      case "0.25":
      case 0.25:
        return "double resisted";
      case "0.5":
      case 0.5:
        return "resisted";
      case "1":
      case 1:
        return "neutral";
      case "2":
      case 2:
        return "supereffective";
      case "4":
      case 4:
        return "double supereffective";
    }
  }, [eff]);

  return (
    <div
      onClick={handleClick}
      style={{
        ...effectivenessColors(eff),
        cursor: handleClick !== undefined ? "pointer" : undefined,
      }}
      className={selected ? styles.eff_chip_selected : styles.eff_chip}
      title={formattedOutput}
    >
      {useTextLabel ? formattedOutput : eff}
    </div>
  );
};
