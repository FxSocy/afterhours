import type { Route } from "./+types/home";
import MFCanvas from "~/components/MFCanvas";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Canvas" }];
}

export default function FirstPage() {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 40px)", padding: "10px" }}>
      <MFCanvas />
    </div>
  );
}
