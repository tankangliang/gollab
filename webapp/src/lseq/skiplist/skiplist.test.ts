import Skiplist from "./index";
import Comparable from "./comparable";

const TestComparable = (value: any) => ({
  value,
  compare: (other: Comparable) => {
    return value > other.value ? 1 : value < other.value ? -1 : 0;
  },
});

test("initialise skiplist", () => {
  const skiplist = new Skiplist();
  skiplist.insert(TestComparable(2));

  expect(skiplist.head[0].right?.item.value).toBe(2);
});

test("adding three items to skiplist", () => {
  const skiplist = new Skiplist();
  skiplist.insert(TestComparable(2));
  skiplist.insert(TestComparable(3));
  skiplist.insert(TestComparable(1));

  expect(skiplist.head[0].right?.item.value).toBe(1);
});

test("items should be sorted", () => {
  const skiplist = new Skiplist();
  skiplist.insert(TestComparable(5));
  skiplist.insert(TestComparable(6));
  skiplist.insert(TestComparable(1));
  skiplist.insert(TestComparable(99));
  skiplist.insert(TestComparable(40));
  skiplist.insert(TestComparable(41));

  expect(skiplist.values).toStrictEqual([1, 5, 6, 40, 41, 99]);
});

test("deleting item works", () => {
  const skiplist = new Skiplist();
  skiplist.insert(TestComparable(5));
  skiplist.insert(TestComparable(6));
  skiplist.insert(TestComparable(1));
  skiplist.insert(TestComparable(99));
  skiplist.insert(TestComparable(40));
  skiplist.insert(TestComparable(41));
  expect(skiplist.values).toStrictEqual([1, 5, 6, 40, 41, 99]);
  skiplist.delete(TestComparable(5));
  expect(skiplist.values).toStrictEqual([1, 6, 40, 41, 99]);
});

test("item at position returns correct item", () => {
  const skiplist = new Skiplist();
  skiplist.insert(TestComparable(5));
  skiplist.insert(TestComparable(6));
  skiplist.insert(TestComparable(1));
  skiplist.insert(TestComparable(3));
  skiplist.insert(TestComparable(2));
  skiplist.insert(TestComparable(4));

  expect(skiplist.atPosition(3).item.value).toBe(3);
});
