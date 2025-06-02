import { Sandbox } from "~/components/Sandbox";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [{ title: "Sandbox" }];
}

export default function SandboxHome() {
    return (
        <Sandbox />
    );
}