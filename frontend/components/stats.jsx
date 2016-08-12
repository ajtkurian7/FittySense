const React = require('react');
const ExerciseStore = require('../stores/exercise_store.js');

const Stats = React.createClass({
  getInitialState () {
    return { feeds: [], routes: [], exercises: [] };
  },

  componentDidMount() {

  },
  render () {
    return(
      <div>Stats</div>
    );
  }
});

module.exports = Stats;
