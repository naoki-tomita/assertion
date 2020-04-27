import { AssertionError } from "../AssertionError";

describe("AssertionError", () => {
  it("should be check by instanceof when catched.", () => {
    try {
      throw new AssertionError({ message: "foo" });
    } catch (e) {
      expect(e instanceof AssertionError).toBe(true);
    }
  });
});
