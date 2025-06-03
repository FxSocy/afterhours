import { useState } from "react";
import { PokemonTypes } from "./PokemonTypes";
import { TypeChipButton } from "./TypeChip";
import styles from "./TypeChart.module.scss";
import { Card, H5, H6 } from "@blueprintjs/core";
import { TypeChartResults } from "./TypeChartResults";

export const TypeChart = () => {
  const [selectedType1, setSelectedType1] = useState<PokemonTypes>();
  const [selectedType2, setSelectedType2] = useState<PokemonTypes>();

  const handleSelectedType = (selected: PokemonTypes) => {
    if (selectedType1 === undefined) setSelectedType1(selected);
    else if (selectedType2 === undefined && selectedType1 !== selected)
      setSelectedType2(selected);
  };

  const handleOnSelectedTypeClick = (index: number) => {
    switch (index) {
      case 1:
        if (selectedType2 !== undefined) {
          setSelectedType1(selectedType2);
          setSelectedType2(undefined);
        } else {
          setSelectedType1(undefined);
        }
        break;
      case 2:
        setSelectedType2(undefined);
        break;
    }
  };

  return (
    <Card className={styles.type_chart_root}>
      <div className={styles.type_chart_header}>
        {selectedType1 && (
          <TypeChipButton
            pokemonType={selectedType1}
            handleOnClick={() => handleOnSelectedTypeClick(1)}
          />
        )}
        {selectedType2 && (
          <TypeChipButton
            pokemonType={selectedType2}
            handleOnClick={() => handleOnSelectedTypeClick(2)}
          />
        )}
      </div>
      <div className={styles.type_chart_main}>
        <div className={styles.type_chart_types}>
          <H5>Types</H5>
          {Object.values(PokemonTypes).map((pType: PokemonTypes) => (
            <TypeChipButton
              pokemonType={pType}
              handleOnClick={() => handleSelectedType(pType)}
            />
          ))}
        </div>
        <TypeChartResults type1={selectedType1} type2={selectedType2} />
      </div>
    </Card>
  );
};
