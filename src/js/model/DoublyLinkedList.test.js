import DoublyLinkedList from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  it('should allow creation of an empty doubly linked list', () => {
    const list = new DoublyLinkedList();

    expect(list).toMatchObject({ head: null, length: 0, tail: null });
  });

  describe('append()', () => {
    it('should add a single element to the end of the DoublyLinkedList', () => {
      const list = new DoublyLinkedList();
      const value = 100;

      list.append(value);

      expect(list).toMatchSnapshot();
    });

    it('should add multiple elements to the end of the DoublyLinkedList', () => {
      const list = new DoublyLinkedList();

      list.append(1).append(2).append(3);

      expect(list).toMatchSnapshot();
    });
  });

  describe('prepend()', () => {
    it('should add an element to an empty list', () => {
      const list = new DoublyLinkedList();

      list.prepend(0);

      expect(list).toMatchSnapshot();
    });

    it('should add a single element to the beginning of the DoublyLinkedList', () => {
      const list = new DoublyLinkedList(1);

      list.prepend(0);

      expect(list).toMatchSnapshot();
    });
  });


  describe('get()', () => {
    it('should get the first element of a list', () => {
      const list = new DoublyLinkedList();
      list.append(1).append(2).append(3);

      const actual = list.get(0);
      expect(actual.value).toEqual(1);
    });

    it('should get the last element of a list', () => {
      const list = new DoublyLinkedList();
      list.append(1).append(2).append(3);

      const actual = list.get(2);
      expect(actual.value).toEqual(3);
    });

    it('should get an element other than the first or last', () => {
      const list = new DoublyLinkedList();
      list.append(1).append(2).append(3).append(4)
        .append(5);

      const actual = list.get(1);
      expect(actual.value).toEqual(2);
    });
  });
});
