import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{mjs,ts,tsx}"],
    languageOptions: {
      globals: {
        console: "readonly", process: "readonly", URL: "readonly",
        TextEncoder: "readonly", Request: "readonly", Response: "readonly",
        window: "readonly", document: "readonly", fetch: "readonly",
        FormData: "readonly", setTimeout: "readonly", clearTimeout: "readonly",
        HTMLElement: "readonly", HTMLFormElement: "readonly",
      },
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
