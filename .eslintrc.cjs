/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "./.eslintrc-auto-import.json",
    "@vue/eslint-config-prettier"
  ],
  env: {
    "vue/setup-compiler-macros": true
  },
  rules: {
    "prettier/prettier": "warn",
    "no-debugger": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off"
  }
}
