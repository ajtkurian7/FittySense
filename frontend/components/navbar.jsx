const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const hashHistory = require("react-router").hashHistory;

const NavBar = React.createClass({

  componentDidMount () {
    this.sessionStoreListener = SessionStore.addListener(this._onChange);
  },

  _handleClick () {
    SessionActions.logOut();
  },

  componentWillUnmount () {
    this.sessionStoreListener.remove();
  },

  _onChange () {
    hashHistory.push("/login");
  },

  render () {
    return(
      <nav className="header-nav">
        <ul className="navbar group">
          <li>
            <Link to="/">
              <h1>FITTY SENSE</h1>
            </Link>
          </li>
          <li>
            <Link to="/routes">My Routes</Link>
          </li>
          <li>
            <Link to="/exercises">My Exercises</Link>
          </li>
          <li>
            <Link to="/stats">My Stats</Link>
          </li>
          <button className="button" onClick={this._handleClick}>
            Log Out
          </button>
        </ul>
      </nav>
    );
  }
});

module.exports = NavBar;
