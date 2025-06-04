import { TypeChart } from "~/components/pokemon/TypeChart";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokemon Types" }];
}

export default function tc() {
  return (
    <div
      style={{ width: "100%", height: "calc(90vh - 40px)", padding: "10px" }}
    >
      <TypeChart />
    </div>
  );
}
