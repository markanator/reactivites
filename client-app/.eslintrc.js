/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [],
  // for vitest
  settings: {
    jest: {
      version: 28,
    },
  },
};
