import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PokemonTypes } from "~/components/pokemon/PokemonTypes";
import { useShallowEqualSelector } from "../store";
import { generateRandomGameRound } from "~/components/pokemon/PokemonUtils";
import type { TypeEffectivenessMap } from "~/components/pokemon/type_matchup_game/RunGame";

export type GameType = "COMPLETE" | "RANDOM" | "CUSTOM";

export interface TypeGameRound {
  roundType: "OFFENSE" | "DEFENSE";
  pokemonType: PokemonTypes;
  correctAnswer: TypeEffectivenessMap;
  userAnswer?: TypeEffectivenessMap;
}

export interface GameState {
  activeRound: TypeGameRound;
  completed: Array<TypeGameRound>;
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
          break;
        case "CUSTOM":
          break;
        case "RANDOM":
          state.gameState = {
            activeRound: generateRandomGameRound(),
            completed: [],
          };
          break;
      }
    },
    submitUserAnswers: (state, action: PayloadAction<TypeEffectivenessMap>) => {
      if (state.gameState) {
        state.gameState.activeRound.userAnswer = action.payload;
      }
    },
    handleGoNextRound: (state) => {
      if (state.gameState) {
        const round = { ...state.gameState.activeRound };
        state.gameState.completed.push(round);
        state.gameState.activeRound = generateRandomGameRound();
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

export const useActiveGameRound = () =>
  useShallowEqualSelector((state) => state.typeGame.gameState?.activeRound);

export const useActiveRoundAnswers = () =>
  useShallowEqualSelector(
    (state) => state.typeGame.gameState?.activeRound.correctAnswer
  );

export const useGameFinished = () =>
  useShallowEqualSelector((state) => state.typeGame.gameFinished);

export default typeGameSlice.reducer;
