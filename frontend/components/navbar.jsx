const React = require('react');
const Link = require('react-router').Link;

const NavBar = React.createClass({
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
            <Link to="/workouts">My Workouts</Link>
          </li>
          <li>
            <Link to="/stats">My Stats</Link>
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = NavBar;
