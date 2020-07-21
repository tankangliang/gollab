import LSEQ from "./index";

test("LSEQ is initialized correctly", () => {
  const lseq = new LSEQ();

  expect(lseq.size).toBe(32);
  expect(lseq.site.length).toBe(5);
});

test("generates random site of correct length", () => {
  const lseq = new LSEQ();

  expect(lseq._getRandomSite().length).toBe(5);
  expect(lseq._getRandomSite(10).length).toBe(10);
  expect(lseq._getRandomSite(200).length).toBe(200);
});

test("adding characters in sequence works", () => {
  const lseq = new LSEQ();
  lseq.insert("a", 0);
  lseq.insert("b", 1);
  lseq.insert("c", 2);

  expect(lseq.string).toEqual("abc");
});

test("adding and deleting characters from different sites end up at same result", () => {
  const l1 = new LSEQ();
  const l2 = new LSEQ();
  const l3 = new LSEQ();

  const i1 = l1.insert("A", 0);
  const i2 = l2.insert("B", 0);
  const i3 = l3.insert("C", 0);

  l1.broadcast("insert", i2);
  l1.broadcast("insert", i3);

  l2.broadcast("insert", i1);
  l2.broadcast("insert", i3);

  l3.broadcast("insert", i2);
  l3.broadcast("insert", i1);

  expect(l1.string).toEqual(l2.string);
  expect(l1.string).toEqual(l3.string);

  const i4 = l1.delete(5);
  l2.broadcast("delete", i4);
  l3.broadcast("delete", i4);
  expect(l1.string).toEqual(l2.string);
  expect(l1.string).toEqual(l3.string);
});

test.todo("delete an element before it is received");
