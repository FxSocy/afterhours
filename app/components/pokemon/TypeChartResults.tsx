import { H6 } from "@blueprintjs/core";
import type { PokemonTypes } from "./PokemonTypes";
import styles from "./TypeChart.module.scss";
import { EffectivenessChip, TypeChip } from "./TypeChip";
import { useTypeDefensiveness, useTypeEffectiveness } from "./PokemonUtils";

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
  const typeEffectiveness = useTypeEffectiveness(pType);

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
          <div className={styles.type_group}>
            {typeEffectiveness.supereffective.length > 0 && (
              <div className={styles.eff_group}>
                <H6 style={{ marginBottom: "4px" }}>Supereffective</H6>
                {typeEffectiveness.supereffective.map((ele) => (
                  <div className={styles.type_effectiveness}>
                    <TypeChip pokemonType={ele} height="30px" width="80px" />
                    <EffectivenessChip eff={2} />
                  </div>
                ))}
              </div>
            )}
            {typeEffectiveness.neutral.length > 0 && (
              <div className={styles.eff_group}>
                <H6 style={{ marginBottom: "4px" }}>Neutral</H6>
                {typeEffectiveness.neutral.map((ele) => (
                  <div className={styles.type_effectiveness}>
                    <TypeChip pokemonType={ele} height="30px" width="80px" />
                    <EffectivenessChip eff={1} />
                  </div>
                ))}
              </div>
            )}
            {typeEffectiveness.resisted.length > 0 && (
              <div className={styles.eff_group}>
                <H6 style={{ marginBottom: "4px" }}>Resisted</H6>
                {typeEffectiveness.resisted.map((ele) => (
                  <div className={styles.type_effectiveness}>
                    <TypeChip pokemonType={ele} height="30px" width="80px" />
                    <EffectivenessChip eff={0.5} />
                  </div>
                ))}
              </div>
            )}
            {typeEffectiveness.immunes.length > 0 && (
              <div className={styles.eff_group}>
                <H6 style={{ marginBottom: "4px" }}>Immune</H6>
                {typeEffectiveness.immunes.map((ele) => (
                  <div className={styles.type_effectiveness}>
                    <TypeChip pokemonType={ele} height="30px" width="80px" />
                    <EffectivenessChip eff={0} />
                  </div>
                ))}
              </div>
            )}
          </div>
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
  const typeDefensiveness = useTypeDefensiveness(pType1, pType2);

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
          {typeDefensiveness.doublesupereffective.length > 0 && (
            <div className={styles.eff_group}>
              <H6 style={{ marginBottom: "4px" }}>Double Supereffective</H6>
              {typeDefensiveness.doublesupereffective.map((ele) => (
                <div className={styles.type_effectiveness}>
                  <TypeChip pokemonType={ele} height="30px" width="80px" />
                  <EffectivenessChip eff={4} />
                </div>
              ))}
            </div>
          )}
          {typeDefensiveness.supereffective.length > 0 && (
            <div className={styles.eff_group}>
              <H6 style={{ marginBottom: "4px" }}>Supereffective</H6>
              {typeDefensiveness.supereffective.map((ele) => (
                <div className={styles.type_effectiveness}>
                  <TypeChip pokemonType={ele} height="30px" width="80px" />
                  <EffectivenessChip eff={2} />
                </div>
              ))}
            </div>
          )}
          {typeDefensiveness.neutral.length > 0 && (
            <div className={styles.eff_group}>
              <H6 style={{ marginBottom: "4px" }}>Neutral</H6>
              {typeDefensiveness.neutral.map((ele) => (
                <div className={styles.type_effectiveness}>
                  <TypeChip pokemonType={ele} height="30px" width="80px" />
                  <EffectivenessChip eff={1} />
                </div>
              ))}
            </div>
          )}
          {typeDefensiveness.resisted.length > 0 && (
            <div className={styles.eff_group}>
              <H6 style={{ marginBottom: "4px" }}>Resisted</H6>
              {typeDefensiveness.resisted.map((ele) => (
                <div className={styles.type_effectiveness}>
                  <TypeChip pokemonType={ele} height="30px" width="80px" />
                  <EffectivenessChip eff={0.5} />
                </div>
              ))}
            </div>
          )}
          {typeDefensiveness.doubleresisted.length > 0 && (
            <div className={styles.eff_group}>
              <H6 style={{ marginBottom: "4px" }}>Double Resisted</H6>
              {typeDefensiveness.doubleresisted.map((ele) => (
                <div className={styles.type_effectiveness}>
                  <TypeChip pokemonType={ele} height="30px" width="80px" />
                  <EffectivenessChip eff={0.25} />
                </div>
              ))}
            </div>
          )}
          <div className={styles.type_group}>
            {typeDefensiveness.immunes.length > 0 && (
              <div className={styles.eff_group}>
                <H6 style={{ marginBottom: "4px" }}>Immune</H6>
                {typeDefensiveness.immunes.map((ele) => (
                  <div className={styles.type_effectiveness}>
                    <TypeChip pokemonType={ele} height="30px" width="80px" />
                    <EffectivenessChip eff={0} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
