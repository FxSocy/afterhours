import { OmniSearch } from "~/components/pokemon/omnisearch/OmniSearch";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Omni-Search" }];
}

export default function omnisearch() {
  return (
    <div
      style={{ width: "100%", height: "calc(90vh - 40px)", padding: "10px" }}
    >
      <OmniSearch />
    </div>
  );
}
