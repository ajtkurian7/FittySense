const React = require('react');

const NavBar = React.createClass({
  render () {
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">
              <h1>FittySense</h1>
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
