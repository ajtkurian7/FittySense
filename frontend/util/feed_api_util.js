const SessionStore = require('../stores/session_store.js');

const FeedApiUtil = {
  fetchUserRoutes(success) {
    $.ajax({
      url: 'api/feeds',
      type: 'GET',
      data: { user_id: SessionStore.currentUser().id },
      success
    });
  },

  postUserFeed(formData, success) {
    $.ajax({
      url: 'api/feeds',
      type: 'POST',
      data: { feed: formData },
      success
    });
  }
};


module.exports = FeedApiUtil;
