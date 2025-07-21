import type { FC } from "react";
import typeChartStyles from "../TypeChart.module.scss";
import { Button, Card, H5 } from "@blueprintjs/core";
import { useAppDispatch } from "~/redux/store";
import {
  setGameActive,
  setGameType,
  startGame,
  useGameType,
  useIsGameActive,
  type GameType,
} from "~/redux/slices/typeGameSlice";
import styles from "./TypesGame.module.scss";
import { RunGame } from "./RunGame";

export const TypesGame: FC = () => {
  const dispatch = useAppDispatch();
  const isGameActive = useIsGameActive();
  const gameType = useGameType();

  const handleSetGame = () => {
    dispatch(setGameActive(!isGameActive));
  };

  return (
    <Card className={typeChartStyles.type_chart_root}>
      {isGameActive ? (
        <>{gameType === undefined ? <GameSelector /> : <RunGame />}</>
      ) : (
        <div
          style={{
            minHeight: "85vh",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              text="START"
              intent="success"
              size="large"
              onClick={handleSetGame}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export const GameSelector: FC = () => {
  const dispatch = useAppDispatch();

  const handleSelectedGameType = (gameType: GameType) => {
    dispatch(setGameType(gameType));
    dispatch(startGame());
  };

  return (
    <div className={styles.game_type_selector_root}>
      <div className={styles.game_type_selector}>
        <H5>Select a Game Type</H5>
        <div style={{ width: "100%", display: "flex", columnGap: "4px" }}>
          <Button
            variant="outlined"
            text="Complete"
            intent="primary"
            onClick={() => handleSelectedGameType("COMPLETE")}
          />
          <Button
            variant="outlined"
            text="Random"
            intent="success"
            onClick={() => handleSelectedGameType("RANDOM")}
          />
          <Button
            variant="outlined"
            text="Custom"
            intent="danger"
            onClick={() => handleSelectedGameType("CUSTOM")}
          />
        </div>
      </div>
    </div>
  );
};
