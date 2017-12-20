export default class Node {
  constructor( data = null ) {
    this.data = data;
    this.isCompleted = false;
    this.next = {};
    this.timesSelected = 0;
  }
}