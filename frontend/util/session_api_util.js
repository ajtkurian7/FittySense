const SessionApiUtil = {
  logIn(user, success, error) {
    $.ajax({
      url: 'api/session',
      type: "POST",
      data: { user },
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

  signUp(user, success, error) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: { user },
      success,
      error(xhr) {
        error("signup", xhr.responseJSON);
      }
    });
  }


};
