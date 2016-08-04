const SessionApiUtil = {
  logIn(formData, success, error) {
    $.ajax({
      url: 'api/session',
      type: "POST",
      data: { user: formData },
      success,
      error(xhr) {
        error("login", xhr.responseJSON);
      }
    });
  },

  logOut(success) {
    $.ajax({
      url: '/api/session',
      method: "DELETE",
      success,
      error() {
        console.log("Logout error in SessionApiUtil#logout");
      }
    });
  },

  signUp(formData, success, error) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: { user: formData },
      success,
      error(xhr) {
        error("signup", xhr.responseJSON);
      }
    });
  }


};

module.exports = SessionApiUtil;
