import React from 'react';

import { shallow } from 'enzyme';

import StudentTable from './StudentTable';
import LinkedList from '../../model/LinkedList';
import Majors from '../../model/Majors';
import Student from '../../model/Student';

describe('<StudentTable/>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<StudentTable randomStudentCount={50} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleGridSort()', () => {
    const directions = ['ASC', 'DESC', 'NONE'];

    directions.forEach((direction) => {
      it(`should sort the linkedlist of students correctly for direction '${direction}'`, () => {
        const wrapper = shallow(<StudentTable randomStudentCount={0} />);
        const keyToBeSortedBy = 'firstName';
        wrapper.setState({
          students: new LinkedList(new Student('Anton', 'Meyer', Majors.COMPUTER_SCIENCE))
            .append(new Student('Xerxes', 'Smith', Majors.MATHEMATICS))
            .append(new Student('George', 'Michael', Majors.HISTORY)),
        });

        wrapper.instance().handleGridSort(keyToBeSortedBy, direction);

        expect([...wrapper.state('students')]).toMatchSnapshot(keyToBeSortedBy + direction);
      });
    });
  });

  describe('rowGetter()', () => {
    it('should return the student at a specified index in the linked-list', () => {
      const wrapper = shallow(<StudentTable randomStudentCount={0} />);
      const testStudent = new Student('Xerxes', 'Smith', Majors.MATHEMATICS);
      wrapper.setState({
        students: new LinkedList(new Student('Anton', 'Meyer', Majors.COMPUTER_SCIENCE))
          .append(testStudent)
          .append(new Student('George', 'Michael', Majors.HISTORY)),
      });

      const actual = wrapper.instance().rowGetter(1);

      expect(actual).toMatchObject(testStudent);
    });
  });
});

