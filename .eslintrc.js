module.exports = {
  "extends": ["standard", "plugin:react/recommended", "plugin:jsx-a11y/recommended"],
  "plugins": [
    "react", "jsx-a11y",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "rules": {
    "jsx-a11y/label-has-for": [ 2, {
      "required": {
        "some": [ "nesting", "id" ],
      },
    }],
  },
  "env": {
    "browser": true,
  },
};
