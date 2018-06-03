import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import faker from 'faker';

import LinkedList from '../../model/LinkedList';
import Student from '../../model/Student';
import Majors from '../../model/Majors';

class StudentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: null,
      columns: [
        {
          key: 'id',
          name: 'ID',
          sortable: true,
        },
        {
          key: 'firstName',
          name: 'First Name',
          sortable: true,
        },
        {
          key: 'lastName',
          name: 'Last Name',
          sortable: true,
        },
        {
          key: 'universityMajor',
          name: 'Major',
          sortable: true,
        },
      ],
    };
  }

  componentWillMount() {
    this.generateRandomStudents(this.props.randomStudentCount);
  }

  generateRandomStudents(count) {
    const randomStudents = new LinkedList();

    for (let i = 0; i < count; i += 1) {
      const randomMajor = () => {
        const keys = Object.keys(Majors);
        return Majors[keys[Math.floor(keys.length * Math.random())]];
      };
      const student = new Student(faker.name.firstName(), faker.name.lastName(), randomMajor());
      randomStudents.append(student);
    }

    this.setState({ students: randomStudents });
    return randomStudents;
  }

  handleGridSort = (columnKey, direction) => {
    const compare = (a, b) => {
      switch (direction) {
        case 'ASC':
          return a[columnKey] > b[columnKey];
        case 'DESC':
          return a[columnKey] < b[columnKey];
        default:
          return a.id > b.id;
      }
    };

    this.setState(prevState => ({
      students: prevState.students.insertionSort(compare),
    }));
  };

  rowGetter = i => this.state.students.get(i).value;

  render() {
    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.students.length}
        minHeight={400}
        onGridSort={this.handleGridSort}
      />
    );
  }
}

StudentTable.propTypes = {
  randomStudentCount: PropTypes.number,
};

StudentTable.defaultProps = {
  randomStudentCount: 50,
};

export default StudentTable;
