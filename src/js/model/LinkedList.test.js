import LinkedList from './LinkedList';


describe('LinkedList', () => {
  it('should allow initialization of a linked list by chaining append methods ', () => {
    const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

    expect(exampleList).toMatchSnapshot()
  });

  describe('prepend()', () => {
    it('should  prepend a linked list with a value', () => {
      const exampleList = new LinkedList("Two").append("Three");
      exampleList.prepend("One");

      expect(exampleList.length).toBe(3);
      expect(exampleList.head.value).toBe("One");
    });
  });

  describe('get()', () => {
    it('should return the node, located at the desired index', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      expect(
        exampleList.get(0).value
      ).toBe("One");

      expect(
        exampleList.get(3).value
      ).toBe("Four");
    });

    it('should throw an error if the searched index does not exist', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const invalidTestIndexes = [-1, 20];

      invalidTestIndexes.forEach((index) =>
        expect(() =>
          exampleList.get(index)
        ).toThrowError('Invalid index'))
    });

    it('should throw an error if trying to get an element from an empty list', () => {
      const emptyList = new LinkedList();

      expect(() =>
        emptyList.get(1)
      ).toThrowError('Empty list')
    });
  });

  describe('remove()', () => {
    it('should remove the second element', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.remove(1);

      expect(exampleList).toMatchSnapshot();
    });

    it('should remove the first element', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.remove(0);

      expect(exampleList).toMatchSnapshot();
    });

    it('should remove an element other than the first or second', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.remove(2);

      expect([...exampleList]).toMatchObject(["One", "Two", "Four"]);
    });

    it('return the linked-list without the removed element', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const deletedNode = exampleList.remove(1);

      expect(deletedNode).toMatchSnapshot();
    });

    it('should throw an error if index to be removed does not exist', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const invalidTestIndexes = [-1, 20];

      invalidTestIndexes.forEach((index) =>
        expect(() =>
          exampleList.remove(index)
        ).toThrowError('Invalid index'))
    });
  });

  describe('getIndex', () => {
    it('should get the index of the first element matching the predefined boolean predicate', () => {
      const exampleObjects = [
        {id: 500, body: 'Strawberry'},
        {id: 100, body: 'Apple'},
        {id: 300, body: 'Lemon'},
        {id: 400, body: 'Pear'},
        {id: 200, body: 'Watermelon'},
      ];
      const fruits = new LinkedList();
      exampleObjects.forEach(object => fruits.append(object));
      const bodyIsPear = element => element.body === 'Pear';

      expect(fruits.getIndex(bodyIsPear)).toEqual(3);
    });
  });

  describe('clear()', () => {
    it('should delete the entire list', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.clear();

      expect(exampleList).toMatchSnapshot();
    });
  });

  describe('filter()', () => {
    it('should return a linked list that was filtered by a predefined predicate function', () => {
      const exampleObjects = [
        {id: 100, body: 'Apple'},
        {id: 200, body: 'Banana'},
        {id: 300, body: 'Strawberry'}
      ];

      const exampleList = new LinkedList(exampleObjects[0]).append(exampleObjects[1]).append(exampleObjects[2]);

      const filtered = exampleList.filter(element => element.body === 'Banana');
      const expected = new LinkedList(exampleObjects[1]);

      expect(filtered).toEqual(expected);
    });
  });

  describe('insertionSort()', () => {
    it('should sort a linked-list of integers', () => {
      const exampleList = new LinkedList(5).append(2).append(20).append(9).append(-5);

      const sorted = exampleList.insertionSort();

      expect([...sorted]).toMatchObject([-5, 2, 5, 9, 20]);
    });

    it('should sort a linked-list of objects, by specified comparator', () => {
      const exampleObjects = [
        {id: 500, body: 'Strawberry'},
        {id: 100, body: 'Apple'},
        {id: 300, body: 'Lemon'},
        {id: 400, body: 'Pear'},
        {id: 200, body: 'Watermelon'},

      ];
      const unsortedList = new LinkedList();
      exampleObjects.forEach(object => unsortedList.append(object));

      const compareId = (a, b) => a.id > b.id;
      const compareNameLength = (a, b) => a.body.length > b.body.length;

      const sortedById = unsortedList.insertionSort(compareId);
      const sortedByName = unsortedList.insertionSort(compareNameLength);

      expect([...sortedById]).toMatchObject([
        {"body": "Apple", "id": 100},
        {"body": "Watermelon", "id": 200},
        {"body": "Lemon", "id": 300},
        {"body": "Pear", "id": 400},
        {"body": "Strawberry", "id": 500}
      ]);

      expect([...sortedByName]).toMatchObject([
        {"body": "Pear", "id": 400},
        {"body": "Apple", "id": 100},
        {"body": "Lemon", "id": 300},
        {"body": "Strawberry", "id": 500},
        {"body": "Watermelon", "id": 200}
      ])
    });
  });

  describe('mergeSort()', () => {
    it('should sort a linked-list of integers', () => {
      const exampleList = new LinkedList(5).append(2).append(20).append(9).append(-5);

      const sorted = exampleList.mergeSort();

      expect([...sorted]).toMatchObject([-5, 2, 5, 9, 20]);
    });

    it('should sort a linked-list of objects, by specified comparator', () => {
      const exampleObjects = [
        {id: 500, body: 'Strawberry'},
        {id: 100, body: 'Apple'},
        {id: 300, body: 'Lemon'},
        {id: 400, body: 'Pear'},
        {id: 200, body: 'Watermelon'},

      ];
      const unsortedList = new LinkedList();
      exampleObjects.forEach(object => unsortedList.append(object));

      const compareId = (a, b) => a.id > b.id;
      const compareNameLength = (a, b) => a.body.length > b.body.length;

      const sortedById = unsortedList.mergeSort(compareId);
      const sortedByName = unsortedList.mergeSort(compareNameLength);

      expect([...sortedById]).toMatchObject([
        {"body": "Apple", "id": 100},
        {"body": "Watermelon", "id": 200},
        {"body": "Lemon", "id": 300},
        {"body": "Pear", "id": 400},
        {"body": "Strawberry", "id": 500}
      ]);

      expect([...sortedByName]).toMatchObject([
        {"body": "Pear", "id": 400},
        {"body": "Lemon", "id": 300},
        {"body": "Apple", "id": 100},
        {"body": "Watermelon", "id": 200},
        {"body": "Strawberry", "id": 500},
      ])
    });
  });

  describe('Generator function', () => {
    it("should alllow iteration over the list's elements", () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const expectedValues = ["One", "Two", "Three", "Four"];

      expect([...exampleList]).toMatchObject(expectedValues)
    });
  });
});
