import { AssertionError } from "./AssertionError";
import { lazyDeepEquals, leftArrayIncludesRightArray, deepEquals } from "./Comparator";

export function expect(actual: any) {
  return {
    includes: {
      item(item: any) {
        if (!lazyDeepEquals(actual, item)) {
          throw new AssertionError({
            message: `Expected object is not includes item.
expected: ${JSON.stringify(actual, null, "  ")}
but was: ${JSON.stringify(item, null, "  ")}`,
            expected: actual,
            actual: item,
          });
        }
      },
      items(items: any[]) {
        if (Array.isArray(actual)) {
          if (!leftArrayIncludesRightArray(actual, items)) {
            throw new AssertionError({
              message: `Expected array are not includes item.
expected: ${JSON.stringify(actual, null, "  ")}
but was: ${JSON.stringify(items, null, "  ")}`,
              expected: actual,
              actual: items,
            });
          }
        } else {
          throw new Error("not implemented");
        }
      },
      lazy: {
        item(item: any) {
          if (!lazyDeepEquals(actual, item)) {
            throw new AssertionError({
              message: `Expected object is not includes item.
expected: ${JSON.stringify(actual, null, "  ")}
but was: ${JSON.stringify(item, null, "  ")}`,
              expected: actual,
              actual: item,
            });
          }
        },
        items(items: any[]) {
          if (Array.isArray(actual)) {
            if (!leftArrayIncludesRightArray(actual, items, lazyDeepEquals)) {
              throw new AssertionError({
                message: `Expected array are not includes item.
expected: ${JSON.stringify(actual, null, "  ")}
but was: ${JSON.stringify(items, null, "  ")}`,
                expected: actual,
                actual: items,
              });
            }
          } else {
            throw new Error("not implemented");
          }
        },
      }
    },
    deepEquals(expected: any) {
      if (!deepEquals(actual, expected)) {
        throw new AssertionError({
          message: `Expected object is not includes item.
expected: ${JSON.stringify(expected, null, "  ")}
but was: ${JSON.stringify(actual, null, "  ")}`,
          expected,
          actual,
        });
      }
    },
    lazy: {
      deepEquals(expected: any) {
        if (!lazyDeepEquals(actual, expected)) {
          throw new AssertionError({
            message: `Expected object is not includes item.
expected: ${JSON.stringify(expected, null, "  ")}
but was: ${JSON.stringify(actual, null, "  ")}`,
            expected,
            actual,
          });
        }
      }
    }
  }
}
