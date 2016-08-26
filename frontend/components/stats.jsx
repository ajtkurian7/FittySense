const React = require('react');
const ExerciseStore = require('../stores/exercise_store.js');
const RouteStore = require('../stores/route_store.js');
const FeedStore = require('../stores/feed_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');
const RouteActions = require('../actions/route_actions.js');
const FeedActions = require('../actions/feed_actions.js');
const Stats = React.createClass({
  getInitialState () {
    return { feeds: [], routes: [], exercises: [] };
  },

  componentDidMount() {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onEChange);
    this.routeStoreListener = RouteStore.addListener(this._onRChange);
    this.feedStoreListener = RouteStore.addListener(this._onFChange);
    ExerciseActions.fetchAllExercises();
    FeedActions.fetchUserRoutes();
    RouteActions.fetchAllRoutes();
  },

  componentWillUnmount() {
    this.exerciseStoreListener.remove();
    this.routeStoreListener.remove();
    this.feedStoreListener.remove();

  },

  _onFChange () {
    this.setState({feeds: FeedStore.all()});
  },

  _onRChange () {
    this.setState({routes: RouteStore.all()});

  },

  _onEChange () {
    this.setState({exercises: ExerciseStore.all()});

  },

  _totalStats() {
    if (this.state.feeds.length) {
      let distance = 0;
      let totalTime = 0;
      let totalExercises = 0;
      this.state.feeds.forEach((feed) => {
        this.state.routes.forEach((route) => {
          if(feed.route_id === route.id) {
              distance += parseFloat(route.map_info.distance);
              totalTime += feed.total_time;
              totalExercises += route.exercise_ids.length;
          }

        });
      });

      return { distance: distance, totalTime: totalTime.toFixed(2), numExercises: totalExercises };
    } else {
      return { distance: 0, totalTime: 0, numExercises: 0 };
    }
  },

  _averageSpeed() {
    if (this.state.feeds.length) {
      return (this._totalStats().distance / this._totalStats().totalTime).toFixed(2);
    } else {
      return 0;
    }
  },

  render () {
    return(
      <div className="stats">
        <h1>My Stats</h1>
        <table className="table">
          <tbody>
          <tr><th>Number of Miles Ran</th>  <td>{this._totalStats().distance} miles</td></tr>
          <tr><th>Number of Hours Working Out:</th> <td>{this._totalStats().totalTime} hr(s)</td></tr>
          <tr><th>Average Speed</th> <td>{this._averageSpeed()} mph</td> </tr>
          <tr><th>Number of Exercises Completed</th>  <td>{this._totalStats().numExercises} Exercises</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Stats;
