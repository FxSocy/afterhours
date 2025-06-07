import { useState } from "react";
import { type Pokemon } from "./PokemonTypes";
import { TypeChip } from "./TypeChip";
import styles from "./TypeChart.module.scss";
import { Card, H6, Icon } from "@blueprintjs/core";

import { TypeChartResults } from "./TypeChartResults";
import { PokemonSelector } from "./PokemonSelector";
import { useGeneration } from "~/redux/slices/searchSlice";
import { useDispatch } from "react-redux";

export const PokemonSearch = () => {
  //const dispatch = useDispatch();
  const generation = useGeneration();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const handleSetSelectedPokemon = (selected: Pokemon) => {
    setSelectedPokemon(selected);
  };

  return (
    <Card className={styles.type_chart_root}>
      <div className={styles.type_chart_header}>
        <div className={styles.type_chart_selected_types}>
          <H6 style={{ marginBottom: "4px" }}>
            {selectedPokemon?.name?.toUpperCase() ?? ""}
          </H6>
          <div style={{ display: "flex" }}>
            {selectedPokemon &&
              selectedPokemon.type.map((pt) => (
                <TypeChip width="80px" height="30px" pokemonType={pt} />
              ))}
          </div>
        </div>
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
