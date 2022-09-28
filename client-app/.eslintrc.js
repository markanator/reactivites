/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: [],
  // for vitest
  settings: {
    jest: {
      version: 28,
    },
  },
};
