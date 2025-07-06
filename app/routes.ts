import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("grid", "./routes/grid.tsx"),
  route("sandbox", "./routes/sandbox.tsx"),
  route("type-calculator", "./routes/typeChart.tsx"),
  route("pokemon-search", "./routes/pokemonSearch.tsx"),
  route("omnisearch", "./routes/omnisearch.tsx"),
] satisfies RouteConfig;
