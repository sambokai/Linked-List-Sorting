class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.length = 0;
    this.head = null;

    if (value) {this.append(value)}
  }

  append(value) {
    const node = new Node(value);
    let currentNode = this.head;

    if (!currentNode) {
      this.head = node;
      this.length++;

      return this;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;

    this.length++;

    return this;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  get(index){
    let current = this.head;
    let count = 0;

    if (this.length === 0) {
      throw new Error('Empty list')
    }

    if (index < 0 || index > this.length) {
      throw new Error('Invalid index')
    }

    while (count < index) {
      current = current.next;
      count++;
    }

    return current;
  }

  remove(index) {
    let current = this.head;

    if (index < 0 || index > this.length) {
      throw new Error('Invalid index')
    }

    if (index === 0) {
      this.head = current.next;
      this.length--;
      return current;
    }

    let count = 0;
    let previousNode;
    let nodeToBeDeleted;

    while (count < index) {
      previousNode = current;
      nodeToBeDeleted = current.next;
      count++;
    }

    previousNode.next = nodeToBeDeleted.next;
    this.length--;
    return nodeToBeDeleted;
  }

  clear(){
    this.head = null;
    this.length = 0;
  }

  *[Symbol.iterator](){
    let element = this.head;

    while (element) {
      yield element.value;
      element = element.next;
    }
  }
}

export default LinkedList;
