import Identifier from './identifier';
import Triplet from './triplet';

test('identifier initialized correctly', () => {
  const value = 'A';
  const triplets = [new Triplet(1, 'site1', 1), new Triplet(3, 'site1', 2)];

  const identifier = new Identifier(value, triplets);

  expect(identifier.value).toBe(value);
  expect(identifier.triplets).toStrictEqual(triplets);
});

test('comparison works as expected', () => {
  const value = 'A';
  const triplet1 = [new Triplet(1, 'site1', 1), new Triplet(3, 'site1', 2)];
  const triplet2 = [new Triplet(2, 'site1', 1), new Triplet(3, 'site1', 2)];

  const identifier1 = new Identifier(value, triplet1);
  const identifier2 = new Identifier(value, triplet2);

  expect(identifier1.compare(identifier2)).toBe(-1)
});
