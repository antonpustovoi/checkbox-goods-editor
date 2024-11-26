import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "react-app",
      "plugin:prettier/recommended",
      "plugin:sonarjs/recommended"
    )
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      react: fixupPluginRules(react),
      import: fixupPluginRules(_import),
      sonarjs: fixupPluginRules(sonarjs)
    },
    rules: {
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["css"]
        }
      ],
      "react/prop-types": [
        "warn",
        {
          ignore: ["children"]
        }
      ],
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"]],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before"
            },
            {
              pattern: "./**",
              group: "sibling",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: false
          }
        }
      ]
    }
  }
];
