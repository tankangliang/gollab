import Comparable from "./skiplist/comparable";
import Triplet from "./triplet";
export default class Identifier implements Comparable {
  value: string;
  triplets: Triplet[];

  constructor(value: string, triplets: Triplet[]) {
    this.value = value;
    this.triplets = triplets;
  }

  compare(other: Identifier) {
    let i = 0;
    while (true) {
      let t1 = this.triplets[i];
      let t2 = other.triplets[i];
      if (t1 === undefined && t2 === undefined) return 0;
      if (t1 === undefined && t2 !== undefined) return -1;
      if (t1 !== undefined && t2 === undefined) return 1;
      let cmp = t1.compare(t2);
      if (cmp !== 0) return cmp;
      else i++;
    }
  }
}
