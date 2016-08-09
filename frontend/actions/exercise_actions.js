const AppDispatcher = require('../dispatcher/dispatcher.js');
const ExerciseApiUtil = require('../util/exercise_api_util.js');

const ExerciseActions = {
  fetchAllExercises() {
    ExerciseApiUtil.fetchAllExercises(this.receiveSavedExercises);
  },

  receiveSavedExercises(exercises) {
    AppDispatcher.dispatch({
      actionType: "SAVED_EXERCISES",
      exercises: exercises
    });
  }
};

module.exports = ExerciseActions;
