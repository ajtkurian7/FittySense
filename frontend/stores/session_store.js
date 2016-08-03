const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;


const SessionStore = new Store(AppDispatcher);

let _currentUser = {};


const _login = function(currentUser) {
  _currentUser = currentUser;

};

const _logout = function () {
  _currentUser = {};

};

SessionStore.currentUser = function () {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = () => !!_currentUser.id;

SessionStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case "LOGIN":
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case "LOGOUT":
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
