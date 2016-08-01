# Phase 5: Allow Stats (1 days, W2 Th 6pm)

## Rails

### Models
  * Stats
### Controllers
  * Api::StatsController (index, show, update)

### Views
  * stats/show.json.jbuilder
  * stats/index.json.jbuilder

## Flux
### Views (React Components)
  * UserStats

### Stores
  * Stats

### Actions
  * `ApiActions.receiveAllStats`
  * `ApiActions.receiveUserStats`
  * `StatsActions.fetchUserStats`
  * `StatsAction.fetchAllStats`
  * `StatsAction.updateStats`

### ApiUtil
  * `ApiUtil.fetchUserStats`
  * `ApiUtil.fetchAllStats`
  * `ApiUtil.updateStats`

## Gems/Libraries
