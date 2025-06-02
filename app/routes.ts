import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("grid", "./routes/grid.tsx"),
  route("sandbox", "./routes/sandbox.tsx"),
  route("typeChart", "./routes/typeChart.tsx")
] satisfies RouteConfig;
