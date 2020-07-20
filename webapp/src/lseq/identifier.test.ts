import Identifier from "./identifier";
import Triplet from "./triplet";

test("identifier initialized correctly", () => {
  const value = "A";
  const triplets = [new Triplet(1, "site1", 1), new Triplet(3, "site1", 2)];

  const identifier = new Identifier(value, triplets);

  expect(identifier.value).toBe(value);
  expect(identifier.triplets).toStrictEqual(triplets);
});
