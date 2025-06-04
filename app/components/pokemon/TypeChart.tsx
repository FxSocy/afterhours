import { useState } from "react";
import { PokemonTypes } from "./PokemonTypes";
import { TypeChipButton } from "./TypeChip";
import styles from "./TypeChart.module.scss";
import { Button, Card, H5, H6 } from "@blueprintjs/core";
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
        <div className={styles.type_chart_selected_types}>
          <H6 style={{ marginBottom: "4px" }}>Selected Types</H6>
          <div style={{ display: "flex" }}>
            {selectedType1 && (
              <TypeChipButton
                width="80px"
                height="30px"
                pokemonType={selectedType1}
                handleOnClick={() => handleOnSelectedTypeClick(1)}
              />
            )}
            {selectedType2 && (
              <TypeChipButton
                width="80px"
                height="30px"
                pokemonType={selectedType2}
                handleOnClick={() => handleOnSelectedTypeClick(2)}
              />
            )}
          </div>
        </div>
        <Button
          icon="reset"
          variant="minimal"
          onClick={() => {
            setSelectedType1(undefined);
            setSelectedType2(undefined);
          }}
        />
      </div>
      <div className={styles.type_chart_main}>
        <div className={styles.type_chart_types}>
          <H5>Types</H5>
          {Object.values(PokemonTypes).map((pType: PokemonTypes) => (
            <TypeChipButton
              width="60px"
              height="30px"
              fontSize="11px"
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
