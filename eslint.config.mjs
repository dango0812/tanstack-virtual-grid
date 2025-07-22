// node
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// eslint
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettierConfig from "eslint-plugin-prettier";

import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const compat = new FlatCompat({
  baseDirectory: _dirname,
  resolvePluginsRelativeTo: _dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const patchedConfig = fixupConfigRules([
  ...compat.extends("next", "next/core-web-vitals", "next/typescript", "prettier")
]);

const eslintConfig = [
  ...patchedConfig,
  ...ts.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [".next", "node_modules"],
    settings: {
      plugins: {
        prettierConfig
      },
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: ts.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
				  jsx: true
				}
      }
    }
  },
  {
    rules: {
      "no-var": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase", "UPPER_CASE", "PascalCase"], selector: "variable", leadingUnderscore: "allow" },
        { format: ["camelCase", "PascalCase"], selector: "function" },
        { format: ["PascalCase"], selector: "interface" },
        { format: ["PascalCase"], selector: "typeAlias" },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    }
  }
];

export default eslintConfig;
