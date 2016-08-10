const React = require('react');


const ExercisesItem = React.createClass({

  _handleDelete () {
    this.props.deleteFn(this.props.exercise.id);
  },

  _handleEdit () {
    this.props.editFn(this.props.exercise);
  },

  render () {
    let editDeleteButtons = [];
    if (this.props.exercise.author_id !== -1) {
      editDeleteButtons.push(<td key={1}><button className="button" onClick={this._handleEdit}>Edit</button></td>);
      editDeleteButtons.push(<td key={2}><button className="button" onClick={this._handleDelete}>Delete</button></td>);
    }
    return(
      <tr>
        <td>{this.props.exercise.title}</td>
        <td>{this.props.exercise.description}</td>
        <td>{this.props.exercise.num_reps}</td>
        <td>{this.props.exercise.difficulty}</td>
        {editDeleteButtons}
      </tr>
    );
  }
});


module.exports = ExercisesItem;
