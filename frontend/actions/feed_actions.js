const AppDispatcher = require('../dispatcher/dispatcher.js');
const FeedApiUtil = require('../util/feed_api_util.js');
const hashHistory = require('react-router').hashHistory;

const FeedActions = {
  fetchUserRoutes() {
    FeedApiUtil.fetchUserRoutes(this.receiveUserRoutes);
  },

  postUserFeed(formData) {
    FeedApiUtil.postUserFeed(formData, this.receiveUserRoutes);
  },

  receiveUserRoutes(routes) {
    AppDispatcher.dispatch({
      actionType: "ALL_ROUTES",
      routes: routes
    });
  }
};

module.exports = FeedActions;
