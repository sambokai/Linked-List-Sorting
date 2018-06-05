class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.length = 0;
    this.head = null;
    this.tail = null;

    if (value) { this.append(value); }
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length += 1;

      return this;
    }

    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.length += 1;

    return this;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length += 1;

      return this;
    }

    node.next = this.head;
    this.head.previous = node;

    this.head = node;
    this.length += 1;

    return this;
  }
}

export default DoublyLinkedList;
