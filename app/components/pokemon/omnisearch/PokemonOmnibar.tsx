import { Omnibar, type ItemRendererProps } from "@blueprintjs/select";
import { useGeneration } from "~/redux/slices/searchSlice";
import { useMemo } from "react";
import type { Pokemon } from "../PokemonTypes";
import { Classes, MenuItem } from "@blueprintjs/core";
import classNames from "classnames";
import { usePokemonData } from "~/redux/slices/pokemonDataSlice";

interface PokemonOmnibarProps {
  isOpen: boolean;
  handleSelect: (value: Pokemon) => void;
  handleClose: () => void;
}

export const PokemonOmnibar: React.FC<PokemonOmnibarProps> = ({
  isOpen,
  handleSelect,
  handleClose,
}) => {
  const generation = useGeneration();
  const pokemonList = usePokemonData(generation);

  const renderPokemon = (item: Pokemon, rendererProps: ItemRendererProps) => (
    <MenuItem
      key={item.name}
      text={item.name}
      onClick={rendererProps.handleClick}
      active={rendererProps.modifiers.active}
      type="listoption"
    />
  );

  const handlePokemonSelect = (value: Pokemon) => {
    handleSelect(value);
    handleClose();
  };

  const filterPokemon = (query: string, item: Pokemon) => {
    return item.name.toUpperCase().includes(query.toUpperCase());
  };

  return (
    <Omnibar
      className={classNames({ [Classes.DARK]: true })}
      isOpen={isOpen}
      itemRenderer={renderPokemon}
      itemPredicate={filterPokemon}
      items={pokemonList}
      onItemSelect={handlePokemonSelect}
      itemsEqual="name"
      noResults={<MenuItem disabled={true} text="No results." />}
      onClose={handleClose}
      resetOnSelect
      inputProps={{ placeholder: "Search Pokemon..." }}
    />
  );
};
