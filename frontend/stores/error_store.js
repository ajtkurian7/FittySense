const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');

const ErrorStore = new Store(AppDispatcher);

let _errors = {};
let _form = "";

function setErrors(payload) {
  _errors = payload.errors;
  _form = payload.form;
  ErrorStore.__emitChange();
}

function clearErrors() {
  _errors = {};
  _form = '';
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "SET_ERRORS":
      setErrors(payload);
      break;
    case "CLEAR_ERRORS":
      clearErrors();
      break;
  }
};


ErrorStore.formErrors = function (form) {
  if (form !== _form) {
    return {};
  }

  const result = {};
  for (let field in _errors) {
    result[field] = Array.from(_errors[field]);
  }

  return result;
};

module.exports = ErrorStore;
