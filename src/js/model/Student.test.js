import Student from './Student';
import Majors from "./Majors";

describe('Student', () => {
  it('should create a student object from valid parameters', () => {
    expect(new Student('Sam', 'Bokai', Majors.COMPUTER_SCIENCE)).toMatchObject({firstName: 'Sam', lastName: 'Bokai', id: 1, universityMajor: Majors.COMPUTER_SCIENCE})
  });

  it('should not allow a non-existing major in its constructor', () => {
    const invalidMajor = '';
    expect(() => new Student('Sam', 'Bokai', invalidMajor)).toThrow('Invalid Major');
  });

  it('should auto-increment studentId on initialization', () => {
    const student1 = new Student('', '', Majors.COMPUTER_SCIENCE);
    const student2 = new Student('', '', Majors.COMPUTER_SCIENCE);

    expect(student1.id).toEqual(1);
    expect(student2.id).toEqual(2);
  });
});
