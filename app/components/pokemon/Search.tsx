import { useEffect, useState } from "react";
import { type Pokemon } from "./PokemonTypes";
import styles from "./TypeChart.module.scss";
import { Card, Icon } from "@blueprintjs/core";
import { TypeChartResults } from "./TypeChartResults";
import { PokemonSelector } from "./PokemonSelector";
import { useGeneration } from "~/redux/slices/searchSlice";
import PokemonImage from "./utilities/PokemonImage";

export const PokemonSearch = () => {
  const gen = useGeneration();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const handleSetSelectedPokemon = (selected: Pokemon) => {
    setSelectedPokemon(selected);
  };

  useEffect(() => {
    setSelectedPokemon(undefined);
  }, [gen]);

  return (
    <Card className={styles.type_chart_root}>
      <div className={styles.type_chart_header}>
        {selectedPokemon && (
          <div className={styles.search_title}>
            <PokemonImage name={selectedPokemon.name} />
            {/* <div className={styles.search_title_name}>
              <H6 style={{ marginBottom: "4px" }}>
                {selectedPokemon?.name?.toUpperCase() ?? ""}
              </H6>
              <div style={{ display: "flex" }}>
                {selectedPokemon &&
                  selectedPokemon.type.map((pt) => (
                    <TypeChip
                      width="80px"
                      height="30px"
                      pokemonType={pt}
                      key={pt}
                    />
                  ))}
              </div>
            </div> */}
          </div>
        )}
        <div className={styles.search_selected_pokemon}>
          <Icon icon="search" intent="primary" />
          <PokemonSelector setSelectedPokemon={handleSetSelectedPokemon} />
        </div>
      </div>
      {selectedPokemon && (
        <TypeChartResults
          type1={
            selectedPokemon.type.length > 0
              ? selectedPokemon.type[0]
              : undefined
          }
          type2={
            selectedPokemon.type.length > 1
              ? selectedPokemon.type[1]
              : undefined
          }
        />
      )}
    </Card>
  );
};
