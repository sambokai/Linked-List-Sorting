/**
 * @typedef {string} majorString
 */

/**
 * An immutable quasi enum of university majors using ES6 syntax.
 * @readonly
 * @enum {majorString} - The human-readable string version of a major.
 */
const Majors = Object.freeze({
  COMPUTER_SCIENCE: 'Computer Science',
  MATHEMATICS: 'Mathematics',
  HISTORY: 'History',
  ECONOMICS: 'Economics',
  PHILOSOPHY: 'Philosophy',
  PHYSICS: 'Physics',
  ELECTRICAL_ENGINEERING: 'Electrical Engineering',
  PSYCHOLOGY: 'Psychology',
  MEDICINE: 'Medicine',
  BIOLOGY: 'Biology',
  CHEMISTRY: 'Chemistry',
  POLITICAL_SCIENCE: 'Political Science',
  ASTROPHYSICS: 'Astrophysics',
  MUSIC: 'Music',
  LINGUISTICS: 'Linguistics',
  SOCIOLOGY: 'Sociology',
});

export default Majors;
