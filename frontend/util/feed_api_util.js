const FeedApiUtil = {
  fetchUserRoutes(success) {
    $.ajax({
      url: 'api/feed',
      type: 'GET',
      success
    });
  }
};
