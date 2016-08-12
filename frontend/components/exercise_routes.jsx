const React = require('react');
const ExerciseRoutesItem = require('./exercise_routes_item.jsx');
const RouteActions = require('../actions/route_actions.js');
const RouteStore = require('../stores/route_store.js');
const hashHistory = require('react-router').hashHistory;

const ExerciseRoutes = React.createClass({
  getInitialState(){
    return { routes: [] };
  },

  componentDidMount () {
    this.routeStoreListener = RouteStore.addListener(this._onChange);
    RouteActions.fetchAllRoutes();
  },

  componentWillUnmount () {
    this.routeStoreListener.remove();
  },

  _onChange () {
    this.setState({ routes: RouteStore.all() });
  },

  _handleClick () {
    hashHistory.push({
      pathname: "route_builder"
    });
  },

  _handleDelete (id) {
    RouteActions.deleteRoute(id);
  },

  render () {
    return(
      <div>
        <div className="subheader">
          <h1>My Routes</h1>
          <button className="button" onClick={this._handleClick}>Create a New Route</button>
        </div>
        <div className="route-items group">
          {this.state.routes.map((route, i) => {
            return <ExerciseRoutesItem key={i} route={route} del={this._handleDelete} />;
          })}
        </div>
      </div>
    );
  }
});

module.exports = ExerciseRoutes;
