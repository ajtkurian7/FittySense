const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const RouteStore = new Store(AppDispatcher);

let _routes = [];

const _addRoutes = (arr) => {
  _routes = arr;
};

RouteStore.all = () => {
  let returnArr = [];

  for (var i = 0; i < _routes.length; i++) {
    returnArr.push(Object.assign({}, _routes[i]));
  }

  return returnArr;
};


RouteStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case "SAVED_ROUTES":
      _addRoutes(payload.routes);
      RouteStore.__emitChange();
      break;
  }
};


module.exports = RouteStore;
