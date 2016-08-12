const React = require('react');

const ExerciseSelector = React.createClass({
  render () {
    return(
      <div className="exercise-selector">

        <p>
          Please Select an Exercise for this Marker:
        </p>
        <select>
          <option value={-1}>{"-"}</option>
          {
            this.props.exercises.map((exercise, i) => {
              return(
                <option key={i} value={i}>{exercise.title}</option>
              );
            })
          }
        </select>
        <button onClick={ this.props.click } className="button">
          Select Exercise
        </button>

      </div>

    );
  }
});

module.exports = ExerciseSelector;
