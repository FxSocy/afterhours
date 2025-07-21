import { Button, Card, H5, H6, Icon } from "@blueprintjs/core";
import { useState, type FC } from "react";
import {
  handleGoNextRound,
  submitUserAnswers,
  useActiveGameRound,
  useActiveRoundReportCard,
  useGameFinished,
  type TypeGameRound,
} from "~/redux/slices/typeGameSlice";
import { EffectivenessChip, TypeChip } from "../TypeChip";
import styles from "./RunGame.module.scss";
import type { PokemonTypes } from "../PokemonTypes";
import { useAppDispatch } from "~/redux/store";

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

  const [userOffenseSelections, setUserOffenseSelections] =
    useState<TypeEffectivenessMap>({ ...blankTypeEffectivenessMap });
  const [userDefenseeSelections, setUserDefenseSelections] =
    useState<TypeEffectivenessMap>({ ...blankTypeEffectivenessMap });

  const handleActionButton = () => {
    round?.reportCard ? handleNextRound() : handleSubmitUserAnswers();
  };

  const handleSubmitUserAnswers = () => {
    dispatch(
      submitUserAnswers({
        offense: userOffenseSelections,
        defense: userDefenseeSelections,
      })
    );
  };

  const handleNextRound = () => {
    dispatch(handleGoNextRound());
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
          <TypeChip pokemonType={round.type} />
          {round.reportCard === undefined ? (
            <GameRound
              round={round}
              userDefenseeSelections={userDefenseeSelections}
              userOffenseSelections={userOffenseSelections}
              setUserDefenseSelections={setUserDefenseSelections}
              setUserOffenseSelections={setUserOffenseSelections}
            />
          ) : (
            <ReportCard round={round} />
          )}
          <Button
            variant="minimal"
            intent="success"
            text={round.reportCard ? "Next" : "Submit"}
            onClick={handleActionButton}
          />
        </div>
      )}
    </div>
  );
};

export const GameRound: FC<{
  round: TypeGameRound;
  userOffenseSelections: TypeEffectivenessMap;
  userDefenseeSelections: TypeEffectivenessMap;
  setUserOffenseSelections: React.Dispatch<
    React.SetStateAction<TypeEffectivenessMap>
  >;
  setUserDefenseSelections: React.Dispatch<
    React.SetStateAction<TypeEffectivenessMap>
  >;
}> = ({
  round,
  userDefenseeSelections,
  userOffenseSelections,
  setUserDefenseSelections,
  setUserOffenseSelections,
}) => {
  if (round?.reportCard) {
    return <div></div>;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "fill",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "8px",
      }}
    >
      <Card className={styles.run_game_column}>
        <H6 style={{ marginBottom: "4px" }}>Offense</H6>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "11px", marginBottom: "0px" }}>
            what effeciveness does
          </p>
          <TypeChip
            width="fit-content"
            height="20px"
            fontSize="10px"
            pokemonType={round.type}
          />
          <p style={{ fontSize: "11px", marginBottom: "0px" }}>
            have when attacking these types?
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2px",
          }}
        >
          {Object.entries(userOffenseSelections).map(([key, value]) => {
            return (
              <div
                key={key}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TypeChip pokemonType={key as PokemonTypes} />
                <TypeOptionSelector
                  selected={value}
                  handleSelectEffectiveness={(eff: UserSingleTypeOptions) => {
                    setUserOffenseSelections((selections) => {
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
      <Card className={styles.run_game_column}>
        <H6 style={{ marginBottom: "4px" }}>Defense</H6>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "11px", marginBottom: "0px" }}>
            what defensiveness does
          </p>
          <TypeChip
            width="fit-content"
            height="20px"
            fontSize="10px"
            pokemonType={round.type}
          />
          <p style={{ fontSize: "11px", marginBottom: "0px" }}>
            have when getting attacked by these types?
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2px",
          }}
        >
          {Object.entries(userDefenseeSelections).map(([key, value]) => {
            return (
              <div
                key={key}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TypeChip pokemonType={key as PokemonTypes} />
                <TypeOptionSelector
                  selected={value}
                  handleSelectEffectiveness={(eff: UserSingleTypeOptions) => {
                    setUserDefenseSelections((selections) => {
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

export const ReportCard: FC<{ round: TypeGameRound }> = ({ round }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "fill",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "8px",
      }}
    >
      <Card className={styles.run_game_column}>
        <H6 style={{ marginBottom: "4px" }}>Offense</H6>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2px",
          }}
        >
          {Object.entries(round.userAnswer.offense).map(([key, value]) => {
            return (
              <div
                key={key}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TypeChip pokemonType={key as PokemonTypes} />
                {round.reportCard?.offense[
                  key as keyof TypeEffectivenessMap
                ] ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "4px",
                    }}
                  >
                    <EffectivenessChip eff={value} />
                    <Icon icon="tick" intent="success" />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "4px",
                    }}
                  >
                    <EffectivenessChip eff={value} />
                    <Icon icon="cross" intent="danger" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
      <Card className={styles.run_game_column}>
        <H6 style={{ marginBottom: "4px" }}>Defense</H6>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2px",
          }}
        >
          {Object.entries(round.userAnswer.defense).map(([key, value]) => {
            return (
              <div
                key={key}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TypeChip pokemonType={key as PokemonTypes} />
                {round.reportCard?.defense[
                  key as keyof TypeEffectivenessMap
                ] ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "4px",
                    }}
                  >
                    <EffectivenessChip eff={value} />
                    <Icon icon="tick" intent="success" />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "4px",
                    }}
                  >
                    <EffectivenessChip eff={value} />
                    <Icon icon="cross" intent="danger" />
                  </div>
                )}
              </div>
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
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr auto",
        columnGap: "20px",
      }}
    >
      <EffectivenessChip eff={selected} selected={true} />
      <div style={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
        {["0", "0.5", "1", "2"].map((option, idx) =>
          option !== selected ? (
            <EffectivenessChip
              key={idx}
              eff={option}
              handleClick={() =>
                handleSelectEffectiveness(option as UserSingleTypeOptions)
              }
            />
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  );
};
