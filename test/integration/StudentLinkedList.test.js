import Student from "../../src/js/model/Student";
import LinkedList from "../../src/js/model/LinkedList";
import Majors from "../../src/js/model/Majors";

const exampleStudents = () => new LinkedList()
  .append(new Student("Sam", "Bokai", "cs"))
  .append(new Student("Yanis", "Varoufakis", "ec"))
  .append(new Student("Slavoj", "Zizek", "hi"))
  .append(new Student("George", "Berg", "cs"))
  .append(new Student("Sam", "Friday", "hi"))
  .append(new Student("Thomas", "Berg", "ma"));


describe('A LinkedList of Students', () => {
  it('should allow searching for students by specific parameters', () => {
    const students = exampleStudents();

    const search = {
      csStudents: (student) => student.universityMajor === Majors.COMPUTER_SCIENCE,
      firstnameSam: (student) => student.firstName === 'Sam',
    };

    const csStudents = students.filter(search.csStudents);
    const firstNameSamStudents= students.filter(search.firstnameSam);

    expect([...csStudents]).toMatchSnapshot("csStudents");
    expect([...firstNameSamStudents]).toMatchSnapshot("firstNameSamStudents");
  });

  it('should allow sorting students by specific properties using insertionSort', () => {
    const students = exampleStudents();

    const sortBy = {
      id: (a, b) => a.id > b.id,
      majorAlphabetically: (a, b) => a.universityMajor > b.universityMajor,
    };

    const sortedById = students.insertionSort(sortBy.id);
    const sortedByMajor = students.insertionSort(sortBy.majorAlphabetically);

    expect([...sortedById]).toMatchSnapshot("sortedById");
    expect([...sortedByMajor]).toMatchSnapshot("sortedByMajor");
  });

  it('should allow sorting students by specific properties using mergeSort', () => {
    const students = exampleStudents();

    const sortBy = {
      id: (a, b) => a.id > b.id,
      majorAlphabetically: (a, b) => a.universityMajor > b.universityMajor,
    };

    const sortedById = students.mergeSort(sortBy.id);
    const sortedByMajor = students.mergeSort(sortBy.majorAlphabetically);

    expect([...sortedById]).toMatchSnapshot("sortedById");
    expect([...sortedByMajor]).toMatchSnapshot("sortedByMajor");
  });
});
