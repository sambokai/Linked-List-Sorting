import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import { Toolbar } from 'react-data-grid-addons';

import faker from 'faker';

import LinkedList from '../../model/LinkedList';
import Student from '../../model/Student';
import Majors from '../../model/Majors';

class StudentTable extends Component {
  static randomStudent() {
    return new Student(faker.name.firstName(), faker.name.lastName(), this.randomMajor());
  }

  static randomMajor() {
    const keys = Object.keys(Majors);
    return Majors[keys[Math.floor(keys.length * Math.random())]];
  }

  constructor(props) {
    super(props);

    this.state = {
      students: new LinkedList(),
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
      maxStudentGenerateCount: 100,
    };

    this.studentGenerateCountInput = React.createRef();
  }

  componentWillMount() {
    this.generateRandomStudents(this.props.initialRandomStudentCount);
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

  handleClearTable = () => {
    const clearedTable = this.state.students.clear();
    this.setState({ students: clearedTable });
  };

  handleGenerateStudents = () => {
    const generateCount = this.studentGenerateCountInput.current.value;
    if (generateCount && generateCount > 0) {
      if (generateCount <= this.state.maxStudentGenerateCount) {
        this.generateRandomStudents(generateCount);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Maximum value of students to be generated is ${this.state.maxStudentGenerateCount}. Please retry.`);
      }
    }
  };

  generateRandomStudents(count) {
    // eslint-disable-next-line prefer-destructuring
    const students = this.state.students;

    for (let i = 0; i < count; i += 1) {
      students.append(StudentTable.randomStudent());
    }

    this.setState({ students });
    return students;
  }

  prependNewStudent = () => {
    const students = this.state.students.prepend(StudentTable.randomStudent());
    this.setState({ students });
  };

  appendNewStudent = () => {
    const students = this.state.students.append(StudentTable.randomStudent());
    this.setState({ students });
  };

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
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <a id="navbar-logo" className="navbar-brand" href="/">Linked List & Students</a>
          <form className="form-inline">
            <div className="form-group">
              <input ref={this.studentGenerateCountInput} defaultValue={50} className="form-control" type="number" size={4} min={1} max={this.state.maxStudentGenerateCount} />
              <button
                id="new-note-button"
                onClick={this.handleGenerateStudents}
                type="button"
                className="btn btn-primary ml-2"
              >Generate Students
              </button>
            </div>
            <button
              id="delete-note-button"
              onClick={this.handleClearTable}
              type="button"
              className="btn btn-danger ml-2"
            >Clear Table
            </button>
          </form>
        </nav>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.filteredRows().length}
          minHeight={600}
          onGridSort={this.handleGridSort}
          toolbar={(
            <Toolbar enableFilter>
              <button className="btn ml-2" onClick={this.prependNewStudent}>Prepend New Student</button>
              <button className="btn ml-2" onClick={this.appendNewStudent}>Append New Student</button>
              <div id="student-count" className="d-inline-block ml-3">Total Students: {this.state.students.length}</div>
            </Toolbar>
          )}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          getCellActions={this.getCellAction}
        />
      </div>
    );
  }
}

StudentTable.propTypes = {
  initialRandomStudentCount: PropTypes.number,
};

StudentTable.defaultProps = {
  initialRandomStudentCount: 500,
};

export default StudentTable;
