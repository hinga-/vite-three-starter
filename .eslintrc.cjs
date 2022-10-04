module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', "import", "unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }],
    "@typescript-eslint/adjacent-overload-signatures": ["off"],
    "@typescript-eslint/member-ordering": ["error", { "classExpressions": ["field", "constructor", ["get", "set"], "method"] }],
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "pathGroups": [
          { "pattern": "src/types/**", "group": "internal", "position": "before" },
        ]
      }
    ]
  },
}
