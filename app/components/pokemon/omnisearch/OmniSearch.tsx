import { Card, H6, useHotkeys } from "@blueprintjs/core";
import styles from "./OmniSearch.module.scss";
import { PokemonOmnibar } from "./PokemonOmnibar";
import { useMemo, useState } from "react";
import type { Pokemon } from "../PokemonTypes";

interface OmniSearchProps {}

export const OmniSearch: React.FC<OmniSearchProps> = () => {
  const [omnibar, setOmnibar] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleOpenSearch = () => {
    setOmnibar(true);
  };

  const hotkeys = useMemo(
    () => [
      {
        combo: "shift + space",
        global: true,
        label: "search pokemon",
        onKeyDown: handleOpenSearch,
      },
    ],
    []
  );

  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  return (
    <>
      <Card
        className={styles.omni_search_card}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <PokemonOmnibar
          isOpen={omnibar}
          handleClose={() => setOmnibar(false)}
          handleSelect={setSelectedPokemon}
        />
        <H6>{selectedPokemon?.name ?? "No Pokemon Selected"}</H6>
      </Card>
    </>
  );
};
