const AppDispatcher = require('../dispatcher/dispatcher.js');
const RouteApiUtil = require('../util/route_api_util.js');
const hashHistory = require('react-router').hashHistory;

const RouteActions = {
  fetchAllRoutes() {
    RouteApiUtil.fetchAllRoutes(this.receiveSavedRoutes);
  },

  postRoute(formData) {
    RouteApiUtil.postRoute(formData, this.receiveSavedRoutes);
  },

  deleteRoute(id){
    RouteApiUtil.deleteRoute(id, this.deletedRoute);
  },

  receiveSavedRoutes(routes) {
    AppDispatcher.dispatch({
      actionType: "SAVED_ROUTES",
      routes: routes
    });
  },

  deletedRoute(route) {
    AppDispatcher.dispatch({
      actionType: "DELETE_ROUTE",
      route: route
    });
  }
};

module.exports = RouteActions;
