import Box from "./box";
import Comparable from "./comparable";

export default class SkipList<T extends Comparable> {
  head: Box<T>[];
  highestLevel: number;

  constructor() {
    this.head = [];
    this.head[0] = Box.Head(0);
    this.highestLevel = 0;
  }

  atPosition(position: number): Box<T> {
    // Account for offset due to skipped
    position = position + 1;
    let current = this.head[this.highestLevel];
    let currentPosition = 0;
    while (position !== currentPosition) {
      if (current.right) {
        const newPosition = currentPosition + current.right.skipped;
        if (newPosition > position) {
          if (current.bottom) {
            current = current.bottom;
            continue;
          } else {
            break;
          }
        } else if (newPosition < position) {
          currentPosition = newPosition;
          current = current.right;
          continue;
        } else {
          current = current.right;
          break;
        }
      } else {
        if (current.bottom) {
          current = current.bottom;
          continue;
        } else {
          break;
        }
      }
    }

    while (current.bottom !== null) {
      current = current.bottom;
    }
    return current;
  }

  find(box: Box<T>): [boolean, Box<T>, number] {
    let position = 0;
    let current = this.head[this.highestLevel];

    while (current.right !== null || current.bottom != null) {
      if (current.right) {
        const cmp = box.compare(current.right);
        if (cmp < 0) {
          if (current.bottom) {
            current = current.bottom;
            continue;
          } else {
            return [false, current, position];
          }
        } else if (cmp > 0) {
          current = current.right;
          position += current.skipped;
          continue;
        } else if (cmp === 0) {
          current = current.right;
          while (current.bottom !== null) current = current.bottom;
          return [true, current, position];
        }
      } else {
        if (current.bottom) {
          current = current.bottom;
          continue;
        }
      }
    }
    return [false, current, position];
  }

  // TODO
  insert(item: T) {
    const newItem = new Box(item, 0);
    const [found, left, position] = this.find(newItem);
    if (found) return;

    const right = left.right;

    left.right = newItem;
    newItem.right = right;

    newItem.left = left;
    if (right) right.left = newItem;

    this.propagate(right, 1);
    this.shouldPromote(newItem, 1, position);
  }

  delete(item: T) {
    const itemToDelete = new Box(item, 0);
    const [found, box] = this.find(itemToDelete);
    let oldItem: Box<T> | null = box;
    if (!found) return;

    const toPropagate = oldItem.right;
    while (oldItem !== null) {
      if (oldItem.left) oldItem.left.right = oldItem.right;
      if (oldItem.right) oldItem.right.left = oldItem.left;
      oldItem = oldItem.top;
    }

    this.propagate(toPropagate, -1);
  }

  // Last completed: Cut down on right obj's skip
  shouldPromote(prev: Box<T>, level: number, position: number) {
    if (Math.random() > 0.5) {
      // Initialise new head
      if (level > this.highestLevel) {
        this.highestLevel = level;
        this.head[this.highestLevel] = Box.Head(this.highestLevel);
        this.head[this.highestLevel].bottom = this.head[this.highestLevel - 1];
        this.head[this.highestLevel - 1].top = this.head[this.highestLevel];
      }

      const newItem = new Box(prev.item, level);
      newItem.bottom = prev;
      prev.top = newItem;
      let current = this.head[level];
      let pos = 0;

      while (current.right !== null) {
        const cmp = newItem.compare(current.right);

        if (cmp < 0) {
          let right = current.right;
          current.right = newItem;
          newItem.right = right;

          newItem.left = current;
          if (right) right.left = newItem;

          // Add 1 as the current item is "skipped" as well
          newItem.skipped = position - pos + 1;
          newItem.right.skipped = newItem.right.skipped - newItem.skipped;

          this.shouldPromote(newItem, level + 1, position);
          return;
        } else if (cmp > 0) {
          current = current.right;
          pos += current.skipped;
          continue;
        }
      }

      // At this point, item is at the right most
      current.right = newItem;
      newItem.skipped = position - pos + 1;
      newItem.left = current;
      this.shouldPromote(newItem, level + 1, position);
      return;
    } else {
      return;
    }
  }

  /**
   * Given starting node, travels right until it finds a node that has
   * a higher level
   * @param node node to start from
   * @param inc +1 if insert, -1 if delete
   */
  propagate(node: Box<T> | null, inc: number) {
    if (node === null) return;
    while (true) {
      if (node.top !== null) {
        node = node.top;
        node.skipped += inc;
        continue;
      } else if (node.right !== null) {
        node = node.right;
        continue;
      } else {
        break;
      }
    }
    return;
  }

  get values(): T[] {
    let current = this.head[0];
    let vals: T[] = [];

    while (current.right !== null) {
      vals[vals.length] = current.right.item.value;
      current = current.right;
    }
    return vals;
  }
}
