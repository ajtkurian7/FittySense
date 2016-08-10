const SessionStore = require('../stores/session_store.js');

const ExerciseApiUtil = {
  fetchAllExercises(success) {
    $.ajax({
      url: 'api/exercises',
      type: "GET",
      data: { user_id: SessionStore.currentUser().id },
      success
    });
  },

  submitExercise(formData, success) {
    $.ajax({
      url: 'api/exercises',
      type: "POST",
      data: { exercise: formData },
      success,
      error(xhr) {
        error("new_exercise", xhr.responseJSON);
      }
    });
  },

  updateExercise(id, formData, success) {
    $.ajax({
      url: 'api/exercises/' + id,
      type: "PATCH",
      data: { exercise: formData },
      success,
      error(xhr) {
        error("update_exercise", xhr.responseJSON);
      }
    });
  },

  deleteExercise(id, success) {

    $.ajax({
      url: 'api/exercises/' + id,
      data: { exercise_id: id },
      type: 'DELETE',
      success
    });
  }
};

module.exports = ExerciseApiUtil;
