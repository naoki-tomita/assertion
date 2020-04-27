export class AssertionError implements Error {
  name = "AssertionError";
  message: string;
  stack?: string | undefined;
  expected: any;
  actual: any;
  constructor({
    message,
    expected,
    actual,
  }: {
    message: string;
    expected?: any;
    actual?: any;
  }) {
    this.message = message;
    this.actual = actual;
    this.expected = expected;
    Error.captureStackTrace(this, AssertionError);
  }

  toString() {
    return this.stack
  }
}
