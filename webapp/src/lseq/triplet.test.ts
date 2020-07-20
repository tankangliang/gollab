import Triplet from "./triplet";

test("triplet initialized correctly", () => {
  const path = 4;
  const site = "site1";
  const count = 3;

  const triplet = new Triplet(path, site, count);

  expect(triplet.path).toBe(path);
  expect(triplet.site).toBe(site);
  expect(triplet.count).toBe(count);
});

test("triplet comparison passes", () => {
  const triplet1 = new Triplet(3, "site2", 5);
  const triplet2 = new Triplet(6, "site1", 2);

  expect(triplet1.compare(triplet2)).toBe(-1);
});
