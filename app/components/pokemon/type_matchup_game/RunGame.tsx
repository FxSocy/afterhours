import { Button, Card, H4, H5, H6, Icon } from "@blueprintjs/core";
import { useState, type FC } from "react";
import {
  handleGoNextRound,
  submitUserAnswers,
  useActiveGameRound,
  useGameFinished,
  type TypeGameRound,
} from "~/redux/slices/typeGameSlice";
import { EffectivenessChip, TypeChip } from "../TypeChip";
import styles from "./RunGame.module.scss";
import type { PokemonTypes } from "../PokemonTypes";
import { useAppDispatch } from "~/redux/store";
import typeChipStyle from "../TypeChart.module.scss";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Shield,
  ShieldHalf,
  Sword,
} from "lucide-react";

export type UserSingleTypeOptions = "0" | "0.5" | "1" | "2";

export interface TypeEffectivenessMap {
  normal: UserSingleTypeOptions;
  fire: UserSingleTypeOptions;
  water: UserSingleTypeOptions;
  electric: UserSingleTypeOptions;
  grass: UserSingleTypeOptions;
  ice: UserSingleTypeOptions;
  fighting: UserSingleTypeOptions;
  poison: UserSingleTypeOptions;
  ground: UserSingleTypeOptions;
  flying: UserSingleTypeOptions;
  psychic: UserSingleTypeOptions;
  bug: UserSingleTypeOptions;
  rock: UserSingleTypeOptions;
  ghost: UserSingleTypeOptions;
  dragon: UserSingleTypeOptions;
  dark: UserSingleTypeOptions;
  steel: UserSingleTypeOptions;
  fairy: UserSingleTypeOptions;
}

export const blankTypeEffectivenessMap: TypeEffectivenessMap = {
  normal: "1",
  fire: "1",
  water: "1",
  electric: "1",
  grass: "1",
  ice: "1",
  fighting: "1",
  poison: "1",
  ground: "1",
  flying: "1",
  psychic: "1",
  bug: "1",
  rock: "1",
  ghost: "1",
  dragon: "1",
  dark: "1",
  steel: "1",
  fairy: "1",
};

export const RunGame: FC = () => {
  const dispatch = useAppDispatch();
  const gameFinished = useGameFinished();

  const round = useActiveGameRound();

  const [userAnswers, setUserAnswers] = useState<TypeEffectivenessMap>({
    ...blankTypeEffectivenessMap,
  });

  const handleActionButton = () => {
    round?.userAnswer ? handleNextRound() : handleSubmitUserAnswers();
  };

  const handleSubmitUserAnswers = () => {
    dispatch(submitUserAnswers({ ...userAnswers }));
  };

  const handleNextRound = () => {
    dispatch(handleGoNextRound());
    setUserAnswers({ ...blankTypeEffectivenessMap });
  };

  if (gameFinished) return <div>Game Finished</div>;

  return (
    <div>
      {round === undefined ? (
        <div>Something went wrong</div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
            }}
          >
            <TypeChip pokemonType={round.pokemonType} />
            {round.roundType === "OFFENSE" ? (
              <Sword size={24} />
            ) : (
              <Shield size={24} />
            )}
            <H5 style={{ marginBottom: "0px" }}>{round.roundType}</H5>
          </div>
          {round.userAnswer === undefined ? (
            <GameRound
              round={round}
              userSelections={userAnswers}
              setUserSelections={setUserAnswers}
            />
          ) : (
            <ReportCard {...round} />
          )}
          <Button
            style={{ borderRadius: "8px", fontWeight: "bold" }}
            intent="success"
            text={round.userAnswer ? "Play Another Round!" : "Submit"}
            onClick={handleActionButton}
          />
        </div>
      )}
    </div>
  );
};

export const GameRound: FC<{
  round: TypeGameRound;
  userSelections: TypeEffectivenessMap;
  setUserSelections: React.Dispatch<React.SetStateAction<TypeEffectivenessMap>>;
}> = ({ round, userSelections, setUserSelections }) => {
  if (round.userAnswer) {
    return <div></div>;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "fill",
        columnGap: "8px",
      }}
    >
      <Card className={styles.run_game_column}>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
        >
          {round.roundType === "OFFENSE" ? (
            <>
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                what effeciveness does
              </p>
              <TypeChip
                width="fit-content"
                height="20px"
                fontSize="10px"
                pokemonType={round.pokemonType}
              />
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                have when attacking these types?
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                what defensiveness does
              </p>
              <TypeChip
                width="fit-content"
                height="20px"
                fontSize="10px"
                pokemonType={round.pokemonType}
              />
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                have when hit with these types?
              </p>
            </>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <H6 style={{ justifySelf: "center" }}>Matchup</H6>
            <H6 style={{ justifySelf: "center" }}>Your Answer</H6>
          </div>
          {Object.entries(userSelections).map(([key, value]) => {
            return (
              <div
                key={key}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div
                  style={{
                    justifySelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "8px",
                    alignItems: "center",
                  }}
                >
                  <TypeChip pokemonType={round.pokemonType} />
                  {round.roundType === "OFFENSE" ? (
                    <>
                      <Sword size={24} />
                      <ArrowBigRightDash size={24} />
                    </>
                  ) : (
                    <>
                      <ShieldHalf size={24} />
                      <ArrowBigLeftDash size={24} />
                    </>
                  )}
                  <TypeChip pokemonType={key as PokemonTypes} />
                </div>
                <TypeOptionSelector
                  selected={value}
                  handleSelectEffectiveness={(eff: UserSingleTypeOptions) => {
                    setUserSelections((selections) => {
                      selections[key as keyof TypeEffectivenessMap] = eff;
                      return { ...selections };
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export const ReportCard: FC<TypeGameRound> = ({
  userAnswer,
  correctAnswer,
  roundType,
  pokemonType,
}) => {
  if (userAnswer === undefined) return <div>fuck you typescript</div>;
  return (
    <div
      style={{
        width: "100%",
        height: "fill",
        columnGap: "8px",
      }}
    >
      <Card className={styles.run_game_column}>
        <H4 style={{ marginBottom: "4px" }}>Results</H4>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr 1fr",
            gap: "2px",
          }}
        >
          <H6 style={{ justifySelf: "center" }}>Type</H6>
          <H6 style={{ justifySelf: "right", marginRight: "8px" }}>Yours</H6>
          <H6 style={{ justifySelf: "center" }}>Correct</H6>
          <H6 style={{ justifySelf: "left" }}>Result</H6>
          {Object.entries(userAnswer).map(([key, value]) => {
            return (
              <>
                <div
                  style={{
                    justifySelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "8px",
                    alignItems: "center",
                  }}
                >
                  <TypeChip pokemonType={pokemonType} />
                  {roundType === "OFFENSE" ? (
                    <>
                      <Sword size={24} />
                      <ArrowBigRightDash size={24} />
                    </>
                  ) : (
                    <>
                      <ShieldHalf size={24} />
                      <ArrowBigLeftDash size={24} />
                    </>
                  )}
                  <TypeChip pokemonType={key as PokemonTypes} />
                </div>
                <div style={{ justifySelf: "right" }}>
                  <EffectivenessChip
                    eff={value}
                    selected={true}
                    useTextLabel={true}
                  />
                </div>
                <div style={{ justifySelf: "center" }}>
                  <EffectivenessChip
                    eff={correctAnswer[key as keyof TypeEffectivenessMap]}
                    selected={true}
                    useTextLabel={true}
                  />
                </div>
                <Icon
                  style={{ justifySelf: "left" }}
                  icon={
                    value === correctAnswer[key as keyof TypeEffectivenessMap]
                      ? "tick"
                      : "cross"
                  }
                  intent={
                    value === correctAnswer[key as keyof TypeEffectivenessMap]
                      ? "success"
                      : "danger"
                  }
                  size={30}
                />
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export const TypeOptionSelector: FC<{
  selected: UserSingleTypeOptions;
  handleSelectEffectiveness: (eff: UserSingleTypeOptions) => void;
}> = ({ selected, handleSelectEffectiveness }) => {
  const handleOptionClick = () => {
    switch (selected) {
      case "0":
        handleSelectEffectiveness("0.5");
        break;
      case "0.5":
        handleSelectEffectiveness("1");
        break;
      case "1":
        handleSelectEffectiveness("2");
        break;
      case "2":
        handleSelectEffectiveness("0");
        break;
    }
  };

  return (
    <div
      style={{
        justifySelf: "center",
        display: "grid",
        alignItems: "center",
        columnGap: "20px",
        userSelect: "none",
      }}
    >
      <EffectivenessChip
        eff={selected}
        selected={true}
        handleClick={handleOptionClick}
        useTextLabel={true}
      />
    </div>
  );
};
