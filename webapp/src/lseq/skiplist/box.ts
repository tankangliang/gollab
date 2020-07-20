import Comparable from "./comparable";

export default class Box<T extends Comparable> {
  item: T;
  level: number;
  skipped: number = 1;
  top: Box<T> | null = null;
  right: Box<T> | null = null;
  left: Box<T> | null = null;
  bottom: Box<T> | null = null;

  static Head(level: number) {
    const tmp: any = {
      value: null,
      compare: () => -1,
    };

    return new Box(tmp, level);
  }

  constructor(item: T, level: number) {
    this.item = item;
    this.level = level;
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
