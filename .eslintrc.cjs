module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      "./tsconfig.base.json",
      "./app/**/tsconfig.json",
      "./packages/**/tsconfig.json",
    ],
  },

  overrides: [
    {
      extends: ["plugin:react-hooks/recommended"],
      files: ["app/**/*.ts?(x)", "packages/**/*.ts?(x)"],
      plugins: ["react-refresh"],
      rules: {
        "react-refresh/only-export-components": "warn",
      },
    },
  ],
};
