class Node {
  /**
   * Create a Node
   * @param {*} value - The content of the node.
   */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  /**
   * Create a LinkedList
   * @param {*} value - (Optional) The content of the first node.
   */
  constructor(value) {
    this.length = 0;
    this.head = null;

    if (value) { this.append(value); }
  }

  /**
   * Add a node to the end of the LinkedList
   * @param {*} value - The content of the node.
   * @returns {LinkedList} - The LinkedList with the new node added to it.
   */
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

  /**
   * Add a node to the beginning of the LinkedList
   * @param {*} value - The content of the node.
   * @returns {LinkedList} - The LinkedList with the new node added to it.
   */
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length += 1;
    return this;
  }

  /**
   * Retrieve an element of the LinkedList from a specific position.
   * @param index - The position from which to retrieve the element.
   * @throws Will throw an error if the list is empty.
   * @throws Will throw an error if the index parameter is out of bounds.
   * @returns {null|*} - The retrieved element.
   */
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

  /**
   * Remove an element of the LinkedList from a specific position.
   * @param index - The position at which to delete the element.
   * @returns {LinkedList} - The LinkedList with the node removed from it.
   */
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

  /**
   * @callback elementSatisfiesCondition
   * @param {*} - The element on which to perform the condition check.
   * @returns {boolean} - Whether the condition matched or not.
   */

  /**
   * Retrieves the position of the first element that matches a specified condition.
   * @param {elementSatisfiesCondition} predicate - The condition.
   * @throws Will throw an error if the list is empty.
   * @returns {number} - The index of the element that matches the condition.
   * Will be -1 if none of the elements matched the condition.
   */
  getIndex(predicate) {
    let current = this.head;
    let count = 0;

    if (this.length === 0) {
      throw new Error('Empty list');
    }

    while (count < this.length) {
      if (predicate(current.value)) return count;
      current = current.next;
      count += 1;
    }

    return -1;
  }

  /**
   * Deletes all nodes from the LinkedList
   * @return {LinkedList} - The LinkedList after having cleared all nodes.
   */
  clear() {
    this.head = null;
    this.length = 0;
    return this;
  }

  /**
   * Filter the LinkedList according to a specified condition.
   * @param {elementSatisfiesCondition} predicate - The condition that all
   * the nodes of the filtered LinkedList must satisfy.
   * @return {LinkedList} - A LinkedList containing only those Nodes that matched the condition.
   */
  filter(predicate) {
    const filtered = new LinkedList();
    // eslint-disable-next-line no-restricted-syntax
    for (const element of [...this].filter(predicate)) {
      filtered.append(element);
    }
    return filtered;
  }

  /**
   * @callback compareTwoElements
   * @description Compares two elements.
   * @param {*} a - The first element.
   * @param {*} b - The second element.
   * @returns {number} - Must return -1 if a is less than b by some defined criterion,
   * return 1 if a is greater than b and 0 if they are equal.
   */

  /**
   * Sorts the LinkedList using an implementation of the insertion sort algorithm.
   * @param {compareTwoElements} compare - (Optional) The compare function by which to sort.
   * By default compares A > B.
   * @return {LinkedList} - The sorted LinkedList.
   */
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

  /**
   * Sorts the LinkedList using an implementation of the merge sort algorithm.
   * @param {compareTwoElements} compare - (Optional) The compare function by which to sort.
   * By default compares A > B.
   * @return {LinkedList} - The sorted LinkedList.
   */
  mergeSort(compare = (a, b) => a > b) {
    const sortedArray = LinkedList.mergeArray([...this], compare);
    const sortedList = new LinkedList();
    sortedArray.forEach(element => sortedList.append(element));
    return sortedList;
  }

  /**
   * Recursive helper function for merge sort.
   * @param {*[]} arr - The array to be sorted.
   * @param {compareTwoElements} compare - The compare function by which to sort.
   * @return {*[]} - The sorted array.
   */
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

  /**
   * Helper function for merge sort, that assigns values to the left/right array
   * based on a compare function and then merges the two arrays.
   * @param {*[]} left - The left array.
   * @param {*[]} right - The right array.
   * @param {compareTwoElements} compare
   * @return {*[]} - The merged array.
   */
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


  /**
   * LinkedList Iterator
   * @description Used to be able to iterate over a LinkedList
   * and use the spread ([...ExampleList]) operator.
   * @return {IterableIterator<*>} - The iterator of the LinkedList
   */
  * [Symbol.iterator]() {
    let element = this.head;

    while (element) {
      yield element.value;
      element = element.next;
    }
  }
}

export default LinkedList;
