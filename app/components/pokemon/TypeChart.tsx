import { useState } from "react";
import { PokemonTypes } from "./PokemonTypes"
import { TypeChip } from "./TypeChip"
import styles from "./TypeChart.module.scss"
import { Card } from "@blueprintjs/core";


export const TypeChart = () => {

    const [selectedType1, setSelectedType1] = useState<PokemonTypes>();
    const [selectedType2, setSelectedType2] = useState<PokemonTypes>();

    return <Card className={styles.type_chart_root}>
        {Object.values(PokemonTypes).map((pType: PokemonTypes) => <TypeChip pokemonType={pType} />)}
    </Card>
}