export default interface Comparable {
  value: any;
  compare: (other: any) => number;
}
