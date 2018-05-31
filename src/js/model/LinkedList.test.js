import LinkedList from './LinkedList';


describe('LinkedList', () => {
  it('should allow initialization of a linked list by chaining append methods ', () => {
    const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");
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

  describe('Generator function', () => {
    it("should alllow iteration over the list's elements", () => {
      const exampleList = new LinkedList("One").append("Two").append("Three").append("Four");

      const expectedValues = ["One", "Two", "Three", "Four"];

      expect([...exampleList]).toMatchObject(expectedValues)
    });
  });
});
