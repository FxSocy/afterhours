import { H6 } from "@blueprintjs/core";
import type { PokemonTypes } from "./PokemonTypes";
import styles from "./TypeChart.module.scss";
import { TypeChip } from "./TypeChip";
import { typeData } from "./PokemonUtils";

export const TypeChartResults = ({
  type1,
  type2,
}: {
  type1?: PokemonTypes;
  type2?: PokemonTypes;
}) => {
  return (
    <div className={styles.results}>
      <TypeChartOffense pType={type1} />
      <TypeChartOffense pType={type2} />
      <TypeChartDefense pType1={type1} pType2={type2} />
    </div>
  );
};

export const TypeChartOffense = ({ pType }: { pType?: PokemonTypes }) => {
  return (
    <>
      {pType && (
        <div className={styles.results_offense}>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "4px" }}
          >
            <TypeChip
              pokemonType={pType}
              width="fit-content"
              height="20px"
              fontSize="10px"
            />
            <H6 style={{ marginBottom: "0px" }}>Offense</H6>
          </div>
          <div className={styles.type_group}></div>
        </div>
      )}
    </>
  );
};

export const TypeChartDefense = ({
  pType1,
  pType2,
}: {
  pType1?: PokemonTypes;
  pType2?: PokemonTypes;
}) => {
  const typeEffectivenessData = typeData();
  console.log(typeEffectivenessData);
  return (
    <>
      {(pType1 || pType2) && (
        <div className={styles.results_defense}>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "4px" }}
          >
            {pType1 && (
              <TypeChip
                pokemonType={pType1}
                width="fit-content"
                height="20px"
                fontSize="10px"
              />
            )}
            {pType2 && (
              <TypeChip
                pokemonType={pType2}
                width="fit-content"
                height="20px"
                fontSize="10px"
              />
            )}
            <H6 style={{ marginBottom: "0px" }}>Defense</H6>
          </div>
          <div className={styles.type_group}></div>
        </div>
      )}
    </>
  );
};
