import React from 'react';
import Students from './Students/Students';

class App extends React.Component {
  static navBar() {
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a id="navbar-logo" className="navbar-brand" href="/">Linked List & Students</a>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {App.navBar()}
        <Students />
      </div>
    );
  }
}

export default App;
