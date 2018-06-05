import Majors from './Majors';

/**
 * The counter for student ids.
 * @type {number}
 */
let studentIdCounter = 0;
/**
 * Increments the studentIdCounter by 1.
 * @return {number} - The studentIdCounter after incrementation.
 */
const incrementId = () => {
  studentIdCounter += 1;
  return studentIdCounter;
};

/**
 * Resets the studentIdCounter by setting it to 0.
 */
export const resetId = () => { studentIdCounter = 0; };


class Student {
  /**
   * Creates a Student object.
   * @param {string} firstName - The student's first name.
   * @param {string} lastName - The student's surname.
   * @param {majorString} universityMajor - The student's university major.
   * @throws Will throw an error if the provided universityMajor param
   * is not part of the Majors enum.
   */
  constructor(firstName, lastName, universityMajor) {
    if (Object.values(Majors).includes(universityMajor)) {
      this.universityMajor = universityMajor;
    } else {
      throw new Error('Invalid Major');
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = incrementId();
  }
}

export default Student;
