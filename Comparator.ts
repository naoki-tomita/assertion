
export function deepEquals(obj1: any, obj2: any): boolean {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (typeof obj1 === "undefined") {
    // obj is undefined.
    return true;
  } else if (typeof obj1 === "number") {
    // NaN === NaN is return false.
    if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
      return true;
    }
    // obj is number.
    return obj1 === obj2;
  } else if (
    typeof obj1 === "string" ||
    typeof obj1 === "function" ||
    typeof obj1 === "symbol" ||
    typeof obj1 === "boolean" ||
    // typeof null === "object". but, Object.keys(null); throws Error.
    // so, if obj1 or obj2 is null then equal check by using "===".
    (obj1 === null || obj2 === null)
  ) {
    // obj is string, function, symbol, boolean, null.
    return obj1 === obj2;
  } else if (Array.isArray(obj1)) {
    // obj is array.
    return (
      obj1.length === obj2.length && obj1.every((o, i) => deepEquals(o, obj2[i]))
    );
  } else if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  return (
    deepEquals(Object.keys(obj1).sort(), Object.keys(obj2).sort())
      && Object.keys(obj1).every(k => deepEquals(obj1[k], obj2[k]))
  );
}

export function lazyDeepEquals(left: any, right: any): boolean {
  if (typeof left !== "object" || left === null) {
    return deepEquals(left, right);
  } else if (left instanceof Date && right instanceof Date) {
    return deepEquals(left, right);
  } else if (Array.isArray(left) && Array.isArray(right)) {
    return leftArrayIncludesRightArray(left, right, lazyDeepEquals);
  }
  return (
    leftArrayIncludesRightArray(Object.keys(left).sort(), Object.keys(right).sort())
      && Object.keys(right).every(k => lazyDeepEquals(left[k], right[k]))
  );
}

export function arrayIncludesItem(
  array: any[],
  item: any,
  comparator: (left: any, right: any) => boolean = deepEquals,
) {
  return array.some(it => comparator(it, item));
}

export function leftArrayIncludesRightArray(
  left: any[],
  right: any[],
  comparator: (left: any, right: any) => boolean = deepEquals,
) {
  return right.every(it => arrayIncludesItem(left, it, comparator));
}

export function leftArrayIncludesRightArraySorted(
  left: any[],
  right: any[],
  comparator: (left: any, right: any) => boolean = deepEquals,
) {
  for (let i = 0; i < left.length; i++) {
    if (comparator(left[i], right[0])) {
      for (let j = 0; i + j < left.length; j++) {
        if (!comparator(left[i + j], right[j])) {
          break;
        } else if (j === right.length - 1) {
          return true;
        }
      }
    }
  }
  return false;
}
