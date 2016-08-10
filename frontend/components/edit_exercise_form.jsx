const React = require('react');
const ExerciseActions = require("../actions/exercise_actions.js");
const ErrorStore = require("../stores/error_store.js");
const SessionStore = require("../stores/session_store.js");

const EditExerciseForm = React.createClass({
  getInitialState () {
    return {
      title: this.props.exercise.title,
      description: this.props.exercise.description,
      num_reps: this.props.exercise.num_reps,
      difficulty: this.props.exercise.difficulty
    };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount () {
    this.errorListener.remove();
  },

  _updateTitleState (e) {
    this.setState({ title: e.target.value });
  },

  _updateDescriptionState (e) {
    this.setState({ description: e.target.value });
  },

  _updateNumRepsState (e) {
    this.setState({ num_reps: e.target.value });
  },

  _updateDifficultyState (e) {
    this.setState({ difficulty: e.target.value });
  },

  _handleSubmit (e) {
    e.preventDefault();
    const formData = {
      title: this.state.title,
      description: this.state.description,
      num_reps: this.state.num_reps,
      difficulty: this.state.difficulty,
      author_id: SessionStore.currentUser().id
    };


    ExerciseActions.updateExercise(this.props.exercise.id, formData);
    this.props.callback();
  },

  fieldErrors(field) {
    const errors = ErrorStore.formErrors("update_exercise");

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  render () {
    return(
      <form onSubmit={this._handleSubmit}>
        <input
          value={this.state.title}
          onChange={this._updateTitleState}
          placeholder="Title"
          className="textbox"/>
        {this.fieldErrors('title')}

        <input
          value={this.state.description}
          onChange={this._updateDescriptionState}
          placeholder="Description"
          className="textbox"/>
        {this.fieldErrors('description')}

        <input
          value={this.state.num_reps}
          onChange={this._updateNumRepsState}
          placeholder="Number of Reps"
          className="textbox"/>
        {this.fieldErrors('num_reps')}

        <input
          value={this.state.difficulty}
          onChange={this._updateDifficultyState}
          placeholder="Difficulty"
          className="textbox"/>
        {this.fieldErrors('difficulty')}

        <input type="submit" value="submit" className="button"/>
        {this.fieldErrors('base')}
      </form>
    );
  }
});

module.exports = EditExerciseForm;
