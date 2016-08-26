const AppDispatcher = require('../dispatcher/dispatcher.js');
const SessionApiUtil = require('../util/session_api_util.js');
const hashHistory = require('react-router').hashHistory;
const ErrorActions = require('./error_actions.js');

const SessionActions = {
  signUp(formData) {
    SessionApiUtil.signUp(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors
    );
  },

  logIn(formData) {
    SessionApiUtil.logIn(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors
    );
  },

  logOut() {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser);
  },


  receiveCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: "LOGIN",
      currentUser: currentUser
    });
  },

  removeCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: "LOGOUT",
      currentUser: currentUser
    });
  }
};

module.exports = SessionActions;
