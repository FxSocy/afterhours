import { useMemo, useState } from "react";
import { PokemonTypes, type Pokemon } from "./PokemonTypes";
import { TypeChip, TypeChipButton } from "./TypeChip";
import styles from "./TypeChart.module.scss";
import { Button, Card, H5, H6, Icon, MenuItem } from "@blueprintjs/core";
import {
  Select,
  type ItemPredicate,
  type ItemRenderer,
} from "@blueprintjs/select";
import { usePokemonData } from "./PokemonUtils";
import { TypeChartResults } from "./TypeChartResults";

export const PokemonSearch = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const filterPokemon: ItemPredicate<Pokemon> = (query, pokemon, _index) => {
    return pokemon.name.toLowerCase().includes(query.toLowerCase());
  };

  const renderPokemon: ItemRenderer<Pokemon> = (
    pokemon,
    { handleClick, handleFocus, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={pokemon.name}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        text={`${pokemon.name}`}
      />
    );
  };

  const handleSetSelectedPokemon = (selected: Pokemon) => {
    setSelectedPokemon(selected);
  };

  const pokemonData = useMemo(() => {
    return usePokemonData();
  }, []);

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
          <Select
            resetOnSelect
            popoverProps={{
              transitionDuration: 0,
            }}
            items={pokemonData}
            itemPredicate={filterPokemon}
            itemRenderer={renderPokemon}
            noResults={
              <MenuItem
                disabled={true}
                text="No results."
                roleStructure="listoption"
              />
            }
            onItemSelect={handleSetSelectedPokemon}
          >
            <div className={styles.search_button_main}>
              <Icon icon="search" />
              Search for Pokemon
            </div>
          </Select>
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
