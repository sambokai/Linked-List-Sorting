class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.length = 0;
    this.head = null;

    if (value) { this.append(value); }
  }

  append(value) {
    const node = new Node(value);
    let currentNode = this.head;

    if (!currentNode) {
      this.head = node;
      this.length += 1;

      return this;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;

    this.length += 1;

    return this;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length += 1;
  }

  get(index) {
    let current = this.head;
    let count = 0;

    if (this.length === 0) {
      throw new Error('Empty list');
    }

    if (index < 0 || index > this.length) {
      throw new Error('Invalid index');
    }

    while (count < index) {
      current = current.next;
      count += 1;
    }

    return current;
  }

  remove(index) {
    let current = this.head;

    if (index < 0 || index > this.length) {
      throw new Error('Invalid index');
    }

    if (index === 0) {
      this.head = current.next;
      this.length -= 1;
      return this;
    }

    let count = 0;
    let previousNode;
    let nodeToBeDeleted;

    while (count < index) {
      previousNode = current;
      nodeToBeDeleted = current.next;
      current = current.next;
      count += 1;
    }

    previousNode.next = nodeToBeDeleted.next;
    this.length -= 1;
    return this;
  }

  getIndex(predicate) {
    let current = this.head;
    let count = 0;

    if (this.length === 0) {
      throw new Error('Empty list');
    }

    while (count < this.length) {
      if (predicate(current.value)) return count
      current = current.next;
      count += 1;
    }

    return -1;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  filter(predicate) {
    const filtered = new LinkedList();
    // eslint-disable-next-line no-restricted-syntax
    for (const element of [...this].filter(predicate)) {
      filtered.append(element);
    }
    return filtered;
  }

  insertionSort(compare = (a, b) => a > b) {
    const items = [...this];
    for (let i = 0; i < items.length; i += 1) {
      const value = items[i];
      let j;
      for (j = i - 1; j > -1 && compare(items[j], value); j -= 1) {
        items[j + 1] = items[j];
      }
      items[j + 1] = value;
    }
    const sorted = new LinkedList();
    items.forEach(element => sorted.append(element));
    return sorted;
  }

  mergeSort(compare = (a, b) => a > b) {
    const sortedArray = LinkedList.mergeArray([...this], compare);
    const sortedList = new LinkedList();
    sortedArray.forEach(element => sortedList.append(element));
    return sortedList;
  }

  static mergeArray(arr, compare) {
    if (arr.length === 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return this.merge(
      this.mergeArray(left, compare),
      this.mergeArray(right, compare),
      compare,
    );
  }

  static merge(left, right, compare) {
    const result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      if (compare(right[indexRight], left[indexLeft])) {
        result.push(left[indexLeft]);
        indexLeft += 1;
      } else {
        result.push(right[indexRight]);
        indexRight += 1;
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }

  * [Symbol.iterator]() {
    let element = this.head;

    while (element) {
      yield element.value;
      element = element.next;
    }
  }
}

export default LinkedList;
