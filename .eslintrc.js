module.exports = {
  extends: [
    // extend react app config
    "react-app",
    // check react hooks using eslint
    "plugin:react-hooks/recommended",
    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    "prettier/@typescript-eslint",
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will
    // display prettier errors as ESLint errors. Make sure this is always the
    // last configuration in the extends array.
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // TODO(lukemurray): move this into the common folder
    // allow unused locals (we use them for defining types in common)
    "no-unused-vars": ["off", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["off", { varsIgnorePattern: "^_" }],
  },
  // prevent eslint from searching above this file
  root: true,
};
