const React = require('react');


const ExercisesItem = React.createClass({
  render () {
    return(
      <tr>
        <td>{this.props.exercise.title}</td>
        <td>{this.props.exercise.description}</td>
        <td>{this.props.exercise.num_reps}</td>
        <td>{this.props.exercise.difficulty}</td>
        <td><button className="button">Edit</button></td>
        <td><button className="button">Delete</button></td>
      </tr>
    );
  }
});


module.exports = ExercisesItem;
