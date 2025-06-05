import type { Route } from "./+types/home";
import { PokemonSearch } from "~/components/pokemon/Search";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Search" }];
}

export default function pokemonSearch() {
  return (
    <div
      style={{ width: "100%", height: "calc(90vh - 40px)", padding: "10px" }}
    >
      <PokemonSearch />
    </div>
  );
}
