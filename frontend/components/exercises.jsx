const React = require('react');
const ExercisesItem = require('./exercises_item.jsx');
const ExerciseStore = require('../stores/exercise_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');
const hashHistory = require('react-router').hashHistory;

const Exercises = React.createClass({
  getInitialState () {
    return { exercises: [] };
  },

  componentDidMount () {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onChange);
    ExerciseActions.fetchAllExercises();
  },

  componentWillUnmount () {
    this.exerciseStoreListener.remove();
  },

  _onChange () {
    this.setState({ exercises: ExerciseStore.all() });
  },

  _handleClick () {
    hashHistory.push({
      pathname: "/new"
    });
  },

  render () {
    return(
      <div>
        <div className="subheader">
          <h1>Exercises</h1>
          <button className="button" onClick={this._handleClick}>
            Create New Exercise
          </button>
        </div>

        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Number of Reps</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
            {this.state.exercises.map((exercise, i) => {
              return <ExercisesItem key={i} exercise={exercise} />;
            })}
        </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Exercises;
