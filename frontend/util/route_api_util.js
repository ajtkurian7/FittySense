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
  },

  deleteRoute(id, success) {
    $.ajax({
      url: 'api/exercise_routes/' + id,
      data: { route_id: id },
      type: "DELETE",
      success
    });
  }
};

module.exports = RouteApiUtil;
