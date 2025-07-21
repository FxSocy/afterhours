import { TypesGame } from "~/components/pokemon/type_matchup_game/TypesGame";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokemon Types" }];
}

export default function tg() {
  return (
    <div
      style={{ width: "100%", height: "calc(90vh - 40px)", padding: "10px" }}
    >
      <TypesGame />
    </div>
  );
}
