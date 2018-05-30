import Student from './Student';

describe('Student', () => {
  it('should create a student object from valid parameters', () => {
    expect(new Student('Sam', 'Bokai', 'cs')).toMatchObject({firstName: 'Sam', lastName: 'Bokai', id: 1, universityMajor: 'cs'})
  });

  it('should not allow a non-existing major in its constructor', () => {
    const invalidMajor = '';
    expect(() => new Student('Sam', 'Bokai', invalidMajor)).toThrow('Invalid Major');
  });

  it('should auto-increment studentId on initialization', () => {
    const student1 = new Student('', '', 'cs');
    const student2 = new Student('', '', 'cs');

    expect(student1.id).toEqual(1);
    expect(student2.id).toEqual(2);
  });
});
