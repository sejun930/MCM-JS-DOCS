module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "***/tsconfig.json",
  },
  globals: {
    JSX: true,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: "off",
    semi: "off",
    "space-before-function-paren": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-danger-with-children": "off",
    "array-callback-return": "off",
    "no-useless-computed-key": "off",
    "react/no-children-prop": "off",
    "react/no-unescaped-entities": "off",
  },
};
