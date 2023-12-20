module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    "no-unused-vars": "error",
    "no-undef": "error",
    "no-const-assign": "error",
    "no-undef-init": "error",
    "no-undef-init": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  ignorePatterns: ["node_modules/", ".next/"],
  settings: {
    "import/resolver": {
      alias: [
        ["@constants", "./constants"],
        ["@pages", "./pages"],
        ["@styles", "./styles"],
        ["@utils", "./utils"],
        ["@allTypes", "./allTypes"],
      ],
    },
  },
}
