const React = require('react');
const ExercisesItem = require('./exercises_item.jsx');
const ExerciseStore = require('../stores/exercise_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-modal');
const NewExerciseForm = require("./new_exercise_form.jsx");
const EditExerciseForm = require("./edit_exercise_form.jsx");
const modalStyle = require("./modal_style.js");

const Exercises = React.createClass({
  getInitialState () {
    return { exercises: [], modalOpen: false, modalForm: []};
  },

  componentDidMount () {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onChange);
    ExerciseActions.fetchAllExercises();
  },

  componentWillUnmount () {
    this.exerciseStoreListener.remove();
  },


  closeModal () {
    this.setState({ modalOpen: false});
    ExerciseActions.fetchAllExercises();
  },

  openModal () {
    this.setState({ modalOpen: true });
  },

  _onChange () {
    this.setState({ exercises: ExerciseStore.all() });
  },

  _handleClick () {
    this.setState({
      modalForm: <NewExerciseForm callback={ this.closeModal } />,
      modalOpen: true
    });
  },

  _deleteExercise (id) {
    ExerciseActions.deleteExercise(id);
  },

  _editExercise (exercise) {
    this.setState({
      modalForm: <EditExerciseForm exercise={exercise} callback={ this.closeModal } />,
      modalOpen: true
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
                return(
                  <ExercisesItem key={i}
                                 exercise={exercise}
                                 deleteFn={this._deleteExercise}
                                 editFn={this._editExercise} />
                );
              })}
          </tbody>
        </table>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.closeModal }
          style={ modalStyle }>

          {this.state.modalForm}

        </Modal>

      </div>
    );
  }
});

module.exports = Exercises;
