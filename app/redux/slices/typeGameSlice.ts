import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PokemonTypes } from "~/components/pokemon/PokemonTypes";
import { useShallowEqualSelector } from "../store";
import {
  GenerateCompleteGameState,
  generateReportCard,
  type EffectivenessType,
} from "~/components/pokemon/PokemonUtils";
import type { TypeEffectivenessMap } from "~/components/pokemon/type_matchup_game/RunGame";

export type GameType = "COMPLETE" | "RANDOM" | "CUSTOM";

export interface TypeInfo {
  offense: TypeEffectivenessMap;
  defense: TypeEffectivenessMap;
}

export interface TypeReportCard {
  offense: Record<PokemonTypes, boolean>;
  defense: Record<PokemonTypes, boolean>;
}

export interface TypeGameRound {
  type: PokemonTypes;
  correctAnswer: TypeInfo;
  userAnswer: TypeInfo;
  reportCard: TypeReportCard | undefined;
}

export interface GameState {
  activeRound: number;
  rounds: Array<TypeGameRound>;
}

export interface TypeGameSlice {
  gameFinished: boolean;
  gameActive: boolean;
  gameType: GameType | undefined;
  gameState: GameState | undefined;
}

const initialState: TypeGameSlice = {
  gameFinished: false,
  gameActive: false,
  gameType: undefined,
  gameState: undefined,
};

export const typeGameSlice = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    setGameActive: (state, action: PayloadAction<boolean>) => {
      state.gameActive = action.payload;
    },
    setGameType: (state, action: PayloadAction<GameType>) => {
      state.gameType = action.payload;
    },
    startGame: (state) => {
      switch (state.gameType) {
        case "COMPLETE":
          state.gameState = {
            rounds: GenerateCompleteGameState(),
            activeRound: 0,
          };
          break;
        case "CUSTOM":
          break;
        case "RANDOM":
          break;
      }
    },
    submitUserAnswers: (
      state,
      action: PayloadAction<{
        offense: TypeEffectivenessMap;
        defense: TypeEffectivenessMap;
      }>
    ) => {
      if (state.gameState) {
        state.gameState.rounds[state.gameState.activeRound].reportCard =
          generateReportCard(
            state.gameState.rounds[state.gameState.activeRound].correctAnswer
              .offense,
            state.gameState.rounds[state.gameState.activeRound].correctAnswer
              .defense,
            action.payload.offense,
            action.payload.defense
          );
      }
    },
    handleGoNextRound: (state) => {
      if (state.gameState) {
        if (
          state.gameState?.activeRound ===
          state.gameState?.rounds.length - 1
        ) {
          state.gameFinished = true;
        } else {
          state.gameState.activeRound += 1;
        }
      }
    },
  },
});

export const {
  setGameActive,
  setGameType,
  startGame,
  submitUserAnswers,
  handleGoNextRound,
} = typeGameSlice.actions;

export const useIsGameActive = () =>
  useShallowEqualSelector((state) => state.typeGame.gameActive);

export const useGameType = () =>
  useShallowEqualSelector((state) => state.typeGame.gameType);

export const useGameState = () =>
  useShallowEqualSelector((state) => state.typeGame.gameState);

export const useActiveGameRound = () => {
  const gameState = useShallowEqualSelector(
    (state) => state.typeGame.gameState
  );
  if (gameState === undefined) return undefined;
  return gameState.rounds[gameState.activeRound];
};

export const useActiveRoundReportCard = () => {
  const gameState = useShallowEqualSelector(
    (state) => state.typeGame.gameState
  );
  if (gameState === undefined) return undefined;
  return gameState.rounds[gameState.activeRound].reportCard;
};

export const useGameFinished = () =>
  useShallowEqualSelector((state) => state.typeGame.gameFinished);

export default typeGameSlice.reducer;
