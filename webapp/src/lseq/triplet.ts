export default class Triplet {
  path: number;
  site: string;
  count: number;

  constructor(path: number, site: string, count: number) {
    this.path = path;
    this.site = site;
    this.count = count;
  }

  compare(other: Triplet) {
    if (this.path < other.path) return -1;
    if (this.path > other.path) return 1;
    if (this.site < other.site) return -1;
    if (this.site > other.site) return 1;
    if (this.count < other.count) return -1;
    if (this.count > other.count) return 1;

    return 0;
  }
}
