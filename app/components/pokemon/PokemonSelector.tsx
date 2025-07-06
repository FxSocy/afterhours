import { useMemo, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import styles from "./PokemonSelector.module.scss";
import React from "react";
import type { Pokemon } from "./PokemonTypes";
import { TypeChip } from "./TypeChip";
import { useGeneration } from "~/redux/slices/searchSlice";
import { useHotkeys } from "@blueprintjs/core";
import { usePokemonData } from "~/redux/slices/pokemonDataSlice";

export const PokemonSelector = ({
  setSelectedPokemon,
}: {
  setSelectedPokemon: (pkmn: Pokemon) => void;
}) => {
  const generation = useGeneration();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnFocus = () => {
    setIsPopoverOpen(true);
  };

  const data = usePokemonData(generation);

  const filteredPokemon = useMemo(() => {
    if (inputValue === "") {
      return data.slice(0, 10);
    } else {
      const filter: Array<Pokemon> = [];
      data.forEach((pkmn: Pokemon, idx: number) => {
        if (filter.length === 10) {
          setHighlightedItem(0);
          return filter;
        }
        const item = pkmn.name.replace(" ", "").toUpperCase();
        const query = inputValue.replace(" ", "").toUpperCase();
        if (item.includes(query)) {
          filter.push(pkmn);
        }
      });
      if (filter.length > 0) setHighlightedItem(0);
      return filter;
    }
  }, [inputValue]);

  const handleUpdateFilterValue = (value: string) => {
    if (!isPopoverOpen) setIsPopoverOpen(true);
    setInputValue(value);
  };

  const handleSetSelected = (value: Pokemon) => {
    setSelectedPokemon(value);
    setInputValue("");
    setHighlightedItem(null);
    setIsPopoverOpen(false);
  };

  const handleKeyEvent = (k: string) => {
    switch (k) {
      case "Escape":
        inputRef.current?.blur();
        return;
      case "Enter":
        if (!isPopoverOpen) {
          setIsPopoverOpen(true);
          return;
        }
        if (highlightedItem === null) setIsPopoverOpen(false);
        else {
          handleSetSelected(filteredPokemon[highlightedItem]);
        }
        break;
      case "ArrowDown":
        if (!isPopoverOpen) {
          setIsPopoverOpen(true);
          return;
        }
        if (filteredPokemon.length > 0) {
          if (highlightedItem === null) {
            setHighlightedItem(0);
          } else {
            const nextIndex =
              highlightedItem + 1 === filteredPokemon.length
                ? 0
                : highlightedItem + 1;
            setHighlightedItem(nextIndex);
          }
        }
        break;
      case "ArrowUp":
        if (filteredPokemon.length > 0) {
          if (highlightedItem === null) {
            setHighlightedItem(filteredPokemon.length);
          } else {
            const nextIndex =
              highlightedItem - 1 === -1
                ? filteredPokemon.length - 1
                : highlightedItem - 1;
            setHighlightedItem(nextIndex);
          }
        }
        break;
    }
  };

  const handleFocusSearch = () => {
    inputRef.current?.focus();
  };

  const hotkeys = useMemo(
    () => [
      {
        combo: "shift + space",
        global: true,
        label: "search pokemon",
        onKeyDown: handleFocusSearch,
      },
    ],
    []
  );

  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  return (
    <>
      <Popover
        ref={inputRef}
        isOpen={isPopoverOpen}
        positions={"bottom"}
        content={() => (
          <div
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className={styles.pokemon_selector_content}
            onMouseOver={() => {
              setHighlightedItem(null);
            }}
          >
            {filteredPokemon.map((fp, idx: number) => (
              <div
                key={fp.name}
                className={
                  highlightedItem === null
                    ? styles.pokemon_popover_item
                    : highlightedItem === idx
                    ? styles.pokemon_popover_item_highlighted
                    : styles.pokemon_popover_item_not_highlighted
                }
                onMouseOver={() => setHighlightedItem(idx)}
                onMouseDown={() => handleSetSelected(fp)}
              >
                {fp.name}
                <div style={{ display: "flex" }}>
                  {fp &&
                    fp.type.map((pt) => (
                      <TypeChip
                        key={pt}
                        width="45px"
                        height="24px"
                        pokemonType={pt}
                        fontSize="8px"
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      >
        <CustomInput
          value={inputValue}
          setValue={handleUpdateFilterValue}
          onFocus={handleOnFocus}
          onLoseFocusEvent={() => {
            setIsPopoverOpen(false);
            setInputValue("");
          }}
          keyEventHandler={handleKeyEvent}
        />
      </Popover>
    </>
  );
};

const CustomInput = React.forwardRef<
  HTMLInputElement,
  {
    value: string;
    setValue: (value: string) => void;
    onFocus: () => void;
    onLoseFocusEvent: () => void;
    keyEventHandler: (k: string) => void;
  }
>((props, ref) => {
  return (
    <input
      value={props.value}
      placeholder="Search"
      className={styles.pokemon_content_input}
      ref={ref}
      onFocus={props.onFocus}
      onChange={(e) => props.setValue(e.target.value)}
      onKeyDown={(e: any) => {
        props.keyEventHandler(e.key);
      }}
      onBlur={props.onLoseFocusEvent}
    />
  );
});
