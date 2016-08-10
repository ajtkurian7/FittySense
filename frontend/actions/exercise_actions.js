const AppDispatcher = require('../dispatcher/dispatcher.js');
const ExerciseApiUtil = require('../util/exercise_api_util.js');

const ExerciseActions = {
  fetchAllExercises() {
    ExerciseApiUtil.fetchAllExercises(this.receiveSavedExercises);
  },

  deleteExercise(id) {
    ExerciseApiUtil.deleteExercise(id, this.deletedExercise);
  },

  submitExercise (formData) {
    ExerciseApiUtil.submitExercise(formData, this.receiveSavedExercises);
  },

  updateExercise (id, formData) {
    ExerciseApiUtil.updateExercise(id, formData, this.receiveSavedExercises);
  },

  deletedExercise(exercise) {
    AppDispatcher.dispatch({
      actionType: "DELETE_EXERCISE",
      exercise: exercise
    });
  },

  receiveSavedExercises(exercises) {
    AppDispatcher.dispatch({
      actionType: "SAVED_EXERCISES",
      exercises: exercises
    });
  }
};

module.exports = ExerciseActions;
