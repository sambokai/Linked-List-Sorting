import React from 'react';

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
      </div>
    );
  }
}

export default App;
