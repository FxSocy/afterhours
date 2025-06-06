import { Card, Icon } from "@blueprintjs/core";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import styles from "./PokemonSelector.module.scss";

export const PokemonSelector = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={"bottom"}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={() => (
          <div
            className={styles.pokemon_selector_content}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            Hi! I'm popover content.
          </div>
        )}
      >
        <div
          className={styles.pokemon_selector_button}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <Icon icon="search" />
          Search
        </div>
      </Popover>
    </>
  );
};
