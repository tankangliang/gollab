import Identifier from "./identifier";
import Skiplist from "./skiplist";
import Box from "./skiplist/box";
import Triplet from "./triplet";

export default class LSEQ {
  size: number;
  site: string;
  count: number;
  store: Skiplist<Identifier>;
  boundary: number;

  constructor(
    size: number = 32,
    site: string = "",
    count: number = 0,
    boundary: number = 10
  ) {
    this.size = size;
    this.store = new Skiplist();
    this.site = site;
    this.count = count;
    this.boundary = boundary;
  }

  insert(value: string, position: number): Identifier {
    const leftBox = this.store.atPosition(position);

    const [leftTriplets, rightTriplets] = this._getTriplets(leftBox);

    const [leftPath, rightPath] = this._tripletToPath(
      leftTriplets,
      rightTriplets
    );
    const [newPath, depth] = this._allocatePath(leftPath, rightPath);
    const newTriplets = this._getNewTriplets(newPath, leftTriplets, depth);
    const newIdentifier = new Identifier(value, newTriplets);
    this.broadcast("insert", newIdentifier);
    return newIdentifier;
  }

  delete(position: number): Identifier {
    const leftBox = this.store.atPosition(position);

    this.broadcast("delete", leftBox.item);
    return leftBox.item;
  }

  broadcast(type: string, identifier: Identifier): number {
    let position: number = -1;
    if (type === "insert") {
      position = this.store.insert(identifier);
    }

    if (type === "delete") {
      position = this.store.delete(identifier);
    }

    return position;
  }

  setSite(site: string) {
    this.site = site;
  }

  _getTriplets(left: Box<Identifier>): [Triplet[], Triplet[]] {
    let leftTriplets: Triplet[];
    let rightTriplets: Triplet[];

    if (left.head) {
      // Left is the head
      leftTriplets = [new Triplet(0, this.site, 0)];
    } else {
      leftTriplets = left.item.triplets;
    }

    if (!left.right) {
      // Left is the last element in the skip list
      rightTriplets = [new Triplet(this.size + 1, this.site, 0)];
    } else {
      rightTriplets = left.right.item.triplets;
    }

    return [leftTriplets, rightTriplets];
  }

  _getNewTriplets(
    newPath: number[],
    leftTriplets: Triplet[],
    depth: number
  ): Triplet[] {
    const newTriplets: Triplet[] = [...leftTriplets];
    newTriplets[depth] = new Triplet(newPath[depth], this.site, this.count);
    this.count++;
    return newTriplets;
  }

  _tripletToPath(
    leftTriplets: Triplet[],
    rightTriplets: Triplet[]
  ): [number[], number[]] {
    let leftPath: number[] = [];
    let rightPath: number[] = [];
    const maxlen = Math.max(leftTriplets.length, rightTriplets.length);

    for (let i = 0; i <= maxlen; i++) {
      if (leftTriplets[i] === rightTriplets[i] && leftTriplets[i]) {
        leftPath[i] = leftTriplets[i].path;
        rightPath[i] = leftPath[i] + 1;
        continue;
      }

      if (leftTriplets[i] === undefined) {
        leftPath[i] = 0;
      } else {
        leftPath[i] = leftTriplets[i].path;
      }

      if (rightTriplets[i] === undefined) {
        rightPath[i] = (i + 1) * this.size;
      } else {
        rightPath[i] = rightTriplets[i]?.path;
      }
    }

    return [leftPath, rightPath];
  }

  _allocatePath(leftPath: number[], rightPath: number[]): [number[], number] {
    const [depth, interval] = this._getDepthInterval(leftPath, rightPath);
    return [
      this._getStrategy(depth)(leftPath, rightPath, depth, interval),
      depth,
    ];
  }

  _getStrategy(depth: number) {
    return depth % 2 === 0
      ? this._leftToRight.bind(this)
      : this._rightToLeft.bind(this);
  }

  _leftToRight(
    leftPath: number[],
    rightPath: number[],
    depth: number,
    interval: number
  ) {
    const step = Math.min(interval, this.boundary) - 1;
    const lastPath = leftPath[depth] + Math.floor(Math.random() * step) + 1;

    const newPath = [...leftPath];
    newPath[depth] = lastPath;
    return newPath;
  }

  _rightToLeft(
    leftPath: number[],
    rightPath: number[],
    depth: number,
    interval: number
  ) {
    const step = Math.min(interval, this.boundary) - 1;
    const lastPath = rightPath[depth] - Math.floor(Math.random() * step) + 1;

    const newPath = [...leftPath];
    newPath[depth] = lastPath;
    return newPath;
  }

  _getDepthInterval(leftPath: number[], rightPath: number[]): [number, number] {
    let depth = -1;
    let interval = 0;
    while (interval < 2) {
      depth = depth + 1;
      interval = rightPath[depth] - leftPath[depth];
    }
    return [depth, interval];
  }
  static getRandomString(size: number = 5): string {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let site = "";

    for (let i = 0; i < size; i++) {
      site += characters[Math.floor(Math.random() * characters.length)];
    }

    return site;
  }

  get values(): Identifier[] {
    return this.store.values;
  }

  get string(): string {
    return this.store.values.map((iden) => iden.value).join("");
  }
}
