import {
  deepEquals,
  lazyDeepEquals,
  leftArrayIncludesRightArray,
  leftArrayIncludesRightArraySorted,
} from "../Comparator";

describe("Comparator", () => {
  describe("#deepEquals", () => {
    function fn() {
      return "foo";
    }
    const sym = Symbol("sym");

    it.each`
      left                      | right                     | expected
      ${"foo"}                  | ${"foo"}                  | ${true}
      ${"foo"}                  | ${"bar"}                  | ${false}
      ${42}                     | ${42}                     | ${true}
      ${42}                     | ${41}                     | ${false}
      ${true}                   | ${true}                   | ${true}
      ${true}                   | ${false}                  | ${false}
      ${NaN}                    | ${NaN}                    | ${true}
      ${NaN}                    | ${42}                     | ${false}
      ${null}                   | ${null}                   | ${true}
      ${null}                   | ${undefined}              | ${false}
      ${undefined}              | ${undefined}              | ${true}
      ${null}                   | ${undefined}              | ${false}
      ${fn}                     | ${fn}                     | ${true}
      ${() => ({ foo: "bar" })} | ${() => ({ foo: "bar" })} | ${false}
      ${sym}                    | ${sym}                    | ${true}
      ${Symbol("foo")}          | ${Symbol("foo")}          | ${false}
      ${["foo", "bar", "hoge"]} | ${["foo", "bar", "hoge"]} | ${true}
      ${["foo", "bar", "hoge"]} | ${["foo", "bar"]}         | ${false}
      ${{
  foo: "foo",
  bar: 12,
  hoge: {
    foo: "foo",
    bar: 12,
    hoge: {
      fuga: "foo",
    },
    arr: [{ foo: "bar" }, { hoge: "fuga" }],
  },
  arr: [{ foo: "bar" }, { hoge: "fuga" }],
}} | ${{
  foo: "foo",
  bar: 12,
  hoge: {
    foo: "foo",
    bar: 12,
    hoge: {
      fuga: "foo",
    },
    arr: [{ foo: "bar" }, { hoge: "fuga" }],
  },
  arr: [{ foo: "bar" }, { hoge: "fuga" }],
}} | ${true}
      ${{
  foo: "foo",
  bar: 12,
  hoge: {
    foo: "foo",
    bar: 12,
    hoge: {
      fuga: "foo",
    },
    arr: [{ foo: "bar" }, { hoge: "fuga" }],
  },
  arr: [{ foo: "bar" }, { hoge: "fuga" }],
}} | ${{
  foo: "foo",
  bar: 12,
  hoge: {
    foo: "foo",
    bar: 12,
    hoge: {
      fuga: "foo",
    },
    arr: [{ foo: "bar" }, { hoge: "fuga" }],
  },
  arr: [{ foo: "bar" }, { hoge: "fug" }],
}} | ${false}
    `("name", ({ left, right, expected }) => {
      try {
        expect(deepEquals(left, right)).toBe(expected);
      } catch (e) {
        expected
          ? expect(left).toEqual(right)
          : expect(left).not.toEqual(right);
      }
    });
  });

  describe("#lazyDeepEquals", () => {
    const actual = {
      string: "string",
      number: 42,
      null: null,
      undefined: undefined,
      NaN: NaN,
      object: {
        string: "string",
        number: 42,
        null: null,
        undefined: undefined,
        NaN: NaN,
        object: {
          string: "string",
          number: 42,
          null: null,
          undefined: undefined,
          NaN: NaN,
          array: [
            {
              string: "string",
              number: 42,
              null: null,
              undefined: undefined,
              NaN: NaN,
            },
          ],
        },
        array: [
          { foo: "foo" },
          { foo: "bar" },
          { foo: "hoge" },
          { foo: "fuga" },
        ],
      },
      array: [{ foo: "foo" }, { foo: "bar" }, { foo: "hoge" }, { foo: "fuga" }],
    };

    const tests = [
      {
        string: "string",
        number: 42,
        null: null,
        undefined: undefined,
        NaN: NaN,
      },
      {
        object: {
          string: "string",
          number: 42,
          null: null,
          undefined: undefined,
          NaN: NaN,
        },
      },
      {
        object: {
          object: {
            string: "string",
            number: 42,
            null: null,
            undefined: undefined,
            NaN: NaN,
          },
        },
      },
      {
        array: [
          { foo: "foo" },
          { foo: "bar" },
          { foo: "hoge" },
          { foo: "fuga" },
        ],
      },
      {
        object: {
          array: [
            { foo: "foo" },
            { foo: "bar" },
            { foo: "hoge" },
            { foo: "fuga" },
          ],
        },
      },
      {
        object: {
          object: {
            array: [{ string: "string" }],
          },
        },
      },
    ];

    it.each(tests)(
      "should decide equally in object lazy deep equally. %o",
      (test) => {
        expect(lazyDeepEquals(actual, test)).toBe(true);
      }
    );
  });

  describe("#leftArrayIncludesRightArray", () => {
    const left = [
      { foo: "bar1", hoge: "fuga1" },
      { foo: "bar2", hoge: "fuga2" },
      { foo: "bar3", hoge: "fuga3" },
      { foo: "bar4", hoge: "fuga4" },
      { foo: "bar5", hoge: "fuga5" },
    ];
    const tests = [
      [
        { foo: "bar1", hoge: "fuga1" },
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar3", hoge: "fuga3" },
        { foo: "bar4", hoge: "fuga4" },
        { foo: "bar5", hoge: "fuga5" },
      ],
      [
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar3", hoge: "fuga3" },
        { foo: "bar4", hoge: "fuga4" },
      ],
      [
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar4", hoge: "fuga4" },
      ],
      [
        { foo: "bar4", hoge: "fuga4" },
        { foo: "bar2", hoge: "fuga2" },
      ],
    ];

    it.each(tests)(
      "should decide right items are included left array. %o",
      (...right) => {
        expect(leftArrayIncludesRightArray(left, right)).toBe(true);
      }
    );
  });

  describe("#leftArrayIncludesRightArraySorted", () => {
    const left = [
      { foo: "bar1", hoge: "fuga1" },
      { foo: "bar2", hoge: "fuga2" },
      { foo: "bar3", hoge: "fuga3" },
      { foo: "bar4", hoge: "fuga4" },
      { foo: "bar5", hoge: "fuga5" },
    ];
    const tests = [
      [
        { foo: "bar1", hoge: "fuga1" },
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar3", hoge: "fuga3" },
        { foo: "bar4", hoge: "fuga4" },
        { foo: "bar5", hoge: "fuga5" },
      ],
      [
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar3", hoge: "fuga3" },
        { foo: "bar4", hoge: "fuga4" },
      ],
    ];
    const failures = [
      [
        { foo: "bar2", hoge: "fuga2" },
        { foo: "bar4", hoge: "fuga4" },
      ],
      [
        { foo: "bar4", hoge: "fuga4" },
        { foo: "bar2", hoge: "fuga2" },
      ],
    ];

    it.each(tests)(
      "should decide right items are included left array maintain order and continuity.",
      (...right) => {
        expect(leftArrayIncludesRightArraySorted(left, right)).toBe(true);
      }
    );
    it.each(failures)(
      "should return false right are not right order.",
      (...right) => {
        expect(leftArrayIncludesRightArraySorted(left, right)).toBe(false);
      }
    );
  });
});
