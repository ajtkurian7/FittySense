# Phase 2: Flux Architecture and Route CRUD (2 days, W1 F 6pm)

## Rails
### Models
* Route

### Controllers
* Api::RoutesController (create, destroy, index, show, update)

### Views
* Routes/index.json.jbuilder
* routes/show.json.jbuilder

## Flux
### Views (React Components)
* RoutesIndex
  - RoutesIndexItem
* RouteMap

### Stores
* OwnRoute

### Actions
* `ApiActions.receiveOwnRoutes`
* `ApiActions.receiveOneRoute`
* `ApiActions.destroyRoute`
* `RouteActions.fetchOwnRoutes`
* `RouteActions.fetchOneRoute`
* `RouteActions.createRoute`
* `RouteActions.updateRoute`
* `RouteActions.deleteRoute`

### ApiUtil
* `ApiUtil.fetchOwnRoutes`
* `ApiUtil.fetchFollowedUsersRoutes`
* `ApiUtil.createRoute`
* `ApiUtil.updateRoute`
* `ApiUtil.deleteRoute`

## Gems/Libraries
