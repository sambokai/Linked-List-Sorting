import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import { Toolbar } from 'react-data-grid-addons';

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
          filterable: true,
          width: 100,
        },
        {
          key: 'firstName',
          name: 'First Name',
          sortable: true,
          filterable: true,
        },
        {
          key: 'lastName',
          name: 'Last Name',
          sortable: true,
          filterable: true,
        },
        {
          key: 'universityMajor',
          name: 'Major',
          sortable: true,
          filterable: true,
        },
      ],
      filters: {},
    };
  }

  componentWillMount() {
    this.generateRandomStudents(this.props.randomStudentCount);
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };


  getCellAction = (column, row) => {
    if (column.key === 'id') {
      return [
        {
          icon: 'fas fa-trash-alt',
          callback: () => { this.deleteStudentById(row.id); },
        },
      ];
    }
    return null;
  };

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

  handleFilterChange = (filter) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [filter.column.key]: filter.filterTerm,
      },
    });
  };

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

  filteredRows = () => {
    const predicate = (student) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.state.filters) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.state.filters.hasOwnProperty(key) && (student[key] === undefined || this.state.filters[key] !== '')) {
          if (
            (key !== 'id' && !student[key].toString().toLowerCase().includes(this.state.filters[key].toLowerCase()))
              || (key === 'id' && student[key].toString().toLowerCase() !== this.state.filters[key].toLowerCase())
          ) {
            return false;
          }
        }
      }
      return true;
    };

    return this.state.students.filter(predicate);
  };

  rowGetter = i => this.filteredRows().get(i).value;


  deleteStudentById(id) {
    const indexToBeDeleted = this.state.students.getIndex(student => student.id === id);
    const studentsWithoutDeleted = this.state.students.remove(indexToBeDeleted);
    this.setState({ students: studentsWithoutDeleted });
  }

  render() {
    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.filteredRows().length}
        minHeight={600}
        onGridSort={this.handleGridSort}
        toolbar={<Toolbar enableFilter />}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        getCellActions={this.getCellAction}
      />
    );
  }
}

StudentTable.propTypes = {
  randomStudentCount: PropTypes.number,
};

StudentTable.defaultProps = {
  randomStudentCount: 500,
};

export default StudentTable;
