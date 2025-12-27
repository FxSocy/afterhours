import { useEffect } from "react";
import {
  thunkedGetImage,
  usePokemonImage,
} from "~/redux/slices/pokemonImageSlice";
import { useAppDispatch } from "~/redux/store";

function PokemonImage({ name }: { name: string }) {
  const dispatch = useAppDispatch();
  const image = usePokemonImage(name);

  useEffect(() => dispatch(thunkedGetImage(name)), [name, dispatch]);

  return <div>{image && <img src={image} alt={name} />}</div>;
}

export default PokemonImage;
