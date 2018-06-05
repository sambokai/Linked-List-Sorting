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

  get(index) {
    if (this.length === 0) {
      throw new Error('Empty list');
    }

    if (index < 0 || index > this.length) {
      throw new Error('Invalid index');
    }

    let current = this.head;

    if (index > this.length / 2) {
      let count = this.length.valueOf();
      while (count >= index) {
        current = current.next;
        count -= 1;
      }
    } else {
      let count = 0;
      while (count < index) {
        current = current.next;
        count = 1;
      }
    }

    return current;
  }
}

export default DoublyLinkedList;
