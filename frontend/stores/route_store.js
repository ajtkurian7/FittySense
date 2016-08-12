const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const RouteStore = new Store(AppDispatcher);

let _routes = [];

const _addRoutes = (arr) => {
  _routes = arr;
};

const _deleteRoute = (route) => {
  let retArr = [];
  for (var i = 0; i < _routes.length; i++) {
      if (_routes[i].id !== route.id) {
        retArr.push(Object.assign({}, _routes[i]));
      }
  }

  _routes = retArr;
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
    case "DELETE_ROUTE":
      _deleteRoute(payload.route);
      RouteStore.__emitChange();
      break;
  }
};


module.exports = RouteStore;
