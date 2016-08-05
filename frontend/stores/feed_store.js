const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const FeedStore = new Store(AppDispatcher);

let _routes = [];

const _addRoutes = (arr) => {
  _routes = arr;
};

FeedStore.all = () => {
  let returnArr = [];

  for (var i = 0; i < _routes.length; i++) {
    returnArr.push(Object.assign({}, _routes[i]));
  }

  return returnArr;
};

FeedStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case "ALL_ROUTES":
      _addRoutes(payload.routes);
      FeedStore.__emitChange();
      break;
  }
};


module.exports = FeedStore;
