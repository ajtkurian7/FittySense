const SessionStore = require('../stores/session_store.js');

const ExerciseApiUtil = {
  fetchAllExercises(success) {
    $.ajax({
      url: 'api/exercises',
      type: "GET",
      data: { user_id: SessionStore.currentUser().id },
      success
    });
  }
};

module.exports = ExerciseApiUtil;
