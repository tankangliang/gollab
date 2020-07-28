import LSEQ from "./index";

test("LSEQ is initialized correctly", () => {
  const lseq = new LSEQ();
  lseq.setSite("lseq");
  expect(lseq.size).toBe(32);
  expect(lseq.site).toBe("lseq");
});

test("generates random site of correct length", () => {
  expect(LSEQ.getRandomString().length).toBe(5);
  expect(LSEQ.getRandomString(10).length).toBe(10);
  expect(LSEQ.getRandomString(200).length).toBe(200);
});

test("adding characters in sequence works", () => {
  const lseq = new LSEQ();
  lseq.setSite("lseq");
  lseq.insert("a", 0);
  lseq.insert("b", 1);
  lseq.insert("c", 2);

  expect(lseq.string).toEqual("abc");
});

test("adding and deleting characters from different sites end up at same result", () => {
  const l1 = new LSEQ();
  l1.setSite("l1");
  const l2 = new LSEQ();
  l2.setSite("l2");
  const l3 = new LSEQ();
  l3.setSite("l3");

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

test("handling large load", () => {
  const lseq = new LSEQ();
  let result = "";
  const arr = new Array(1000).fill(0);
  arr.forEach((_, i) => {
    lseq.insert(i.toString(), i);
    result = result + i.toString();
  });

  expect(lseq.string).toEqual(result);
});

test("deleting", () => {
  const lseq = new LSEQ();
  const arr = new Array(1000).fill(0);
  arr.forEach((_, i) => {
    lseq.insert(i.toString(), i);
  });

  for (let i = 998; i > 0; i--) {
    lseq.delete(i);
  }
  expect(lseq.string).toBe("998999");
});

test.todo("delete an element before it is received");
