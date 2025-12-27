import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React rules
  react.configs.flat.recommended,

  // 🔴 OVERRIDES MUST COME LAST
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
]);
