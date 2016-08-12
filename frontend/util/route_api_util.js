const SessionStore = require('../stores/session_store.js');

const RouteApiUtil = {
  fetchAllRoutes(success){
    $.ajax({
      url: 'api/exercise_routes',
      type: 'GET',
      data: { user_id: SessionStore.currentUser().id },
      success
    });
  },

  postRoute(formData, success){
    $.ajax({
      url: 'api/exercise_routes',
      type: "POST",
      data: { route: formData },
      success,
    });
  }
};

module.exports = RouteApiUtil;
