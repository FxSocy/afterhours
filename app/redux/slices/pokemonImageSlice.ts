import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  useShallowEqualSelector,
  type AppDispatch,
  type RootState,
} from "../store";

export interface ImageState {
  images: Record<string, any>;
}

const initialState: ImageState = {
  images: {},
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<{ key: string; image: any }>) => {
      console.log(action.payload);
      state.images[action.payload.key] = action.payload.image;
    },
  },
});

export const { addImage } = imageSlice.actions;

//THUNKS

export const thunkedGetImage =
  (name: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const image = getState().image.images[name];
    if (image === undefined) {
      async function fetchPokemon() {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        dispatch(addImage({ key: name, image: data.sprites.front_default }));
      }

      fetchPokemon();
    }
  };

//SELECTORS

export const usePokemonImage = (name: string) =>
  useShallowEqualSelector((state: RootState) => state.image.images[name]);

export default imageSlice.reducer;
