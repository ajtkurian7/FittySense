const React = require('react');
const SessionStore = require('../stores/session_store.js');
const NavBar = require('./navbar.jsx');

const App = React.createClass({
  showNavBar () {
    if (SessionStore.isUserLoggedIn()) {
      return <NavBar />;
    } else {return;}
  },

  render () {
    return(
      <div>
        {this.showNavBar()}
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
