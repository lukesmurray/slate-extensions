const rootConfig = require("../../jest.config");

module.exports = {
  ...rootConfig,
  setupFilesAfterEnv: ["./test/jest-setup.ts"],
};
