module.exports = {
  moduleNameMapper: {
    // see https://jestjs.io/docs/en/webpack#mocking-css-modules
    // this fixes issues such as `import "tippy.js/themes/light.css"`
    "\\.(css)$": "identity-obj-proxy",
  },
};
