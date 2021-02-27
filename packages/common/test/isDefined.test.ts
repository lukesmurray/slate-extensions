import { isDefined } from "../src";

describe("isDefined", () => {
  it("works", () => {
    expect(isDefined({})).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});
