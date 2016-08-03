const AppDispatcher = require('../dispatcher/dispatcher');

const ErrorActions = {
  setErrors(form, errors) {
    AppDispatcher.dispatch({
      actionType: "SET_ERRORS",
      form: form,
      errors: errors
    });
  },

  clearErrors(form, errors) {
    AppDispatcher.dispatch({
      actionType: "CLEAR_ERRORS",
      form: form,
      errors: errors
    });
  }
};

module.exports = ErrorActions;
