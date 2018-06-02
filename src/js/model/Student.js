import Majors from "./Majors";

let studentIdCounter = 0;
const incrementId = () => {
  studentIdCounter += 1;
  return studentIdCounter;
};

export const resetId = () => {studentIdCounter = 0;};


class Student {
  constructor(firstName, lastName, universityMajor) {
    if (Object.values(Majors).includes(universityMajor)) {
      this.universityMajor = universityMajor;
    } else {
      throw 'Invalid Major';
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = incrementId();
  }
}

export default Student;
