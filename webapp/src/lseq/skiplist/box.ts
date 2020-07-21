import Comparable from "./comparable";

export default class Box<T extends Comparable> {
  item: T;
  level: number;
  skipped: number = 1;
  top: Box<T> | null = null;
  right: Box<T> | null = null;
  left: Box<T> | null = null;
  bottom: Box<T> | null = null;
  head: boolean;

  static Head(level: number) {
    const tmp: any = {
      value: null,
      compare: () => -1,
    };

    return new Box(tmp, level, true);
  }

  constructor(item: T, level: number, head: boolean = false) {
    this.item = item;
    this.level = level;
    this.head = head;
  }

  compare(other: Box<T>) {
    return this.item.compare(other.item);
  }

  toString(): string {
    return `\n----------\nBox item ${this.item.value} | skipped ${
      this.skipped
    } | level ${this.level}|\n\tright: ${this.right?.toString()}\n`;
  }
}
