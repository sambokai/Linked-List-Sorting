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
    it('should remove an element at a specified index other than 0', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.remove(1);

      expect(exampleList).toMatchSnapshot();
    });

    it('should remove the first element if desired', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      exampleList.remove(0);

      expect(exampleList).toMatchSnapshot();
    });

    it('return the removed element', () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const deletedNode = exampleList.remove(1);

      expect(deletedNode.value).toBe("Two");
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

  describe('Generator function', () => {
    it("should alllow iteration over the list's elements", () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const expectedValues = ["One", "Two", "Three", "Four"];

      expect([...exampleList]).toMatchObject(expectedValues)
    });
  });
});
