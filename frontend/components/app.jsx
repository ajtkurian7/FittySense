const React = require('react');
const SessionStore = require('../stores/session_store.js');
const NavBar = require('./navbar.jsx');

const App = React.createClass({
  showNavBar () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div className="nav">
          <NavBar />
        </div>
      );
    } else {return;}
  },

  render () {
    return(
      <div className="app">
          {this.showNavBar()}
        <div className="children">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
