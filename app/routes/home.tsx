import type { Route } from "./+types/home";
import { H2 } from "@blueprintjs/core";
import styles from "./home.module.scss"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Afterhours" },
  ];
}

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1
      }}
    >
      <div className={styles.home_card_rgb}>
        <div className={styles.home_card}>
          <H2>Afterhours</H2>
          <div style={{ fontSize: "10px" }}>a decent into madness</div>
        </div>
      </div>
    </div>
  );
}
