import Skiplist from "./skiplist";
import Identifier from "./identifier";
import Triplet from "./triplet";
export default class LSEQ {
  size: number;
  store: Skiplist<Identifier>;

  constructor(size: number = 32) {
    this.size = size;
    this.store = new Skiplist();
  }

  insert(value: string, position: number) {
    const leftBox = this.store.atPosition(position);

    let left = leftBox.item.triplets;
    let right = leftBox.right
      ? leftBox.right.item.triplets
      : [new Triplet(this.size + 1, "MAX", 1)];
  }
}
