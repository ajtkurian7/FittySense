# Phase 3: Exercises (2 day, W2 Tu 6pm)

## Rails
### Models
* Exercise


### Controllers
* Api::ExercisesController (create, destroy, index, show, update)

### Views
* exercises/index.json.jbuilder
* exercises/show.json.jbuilder

## Flux
### Views (React Components)
* ExercisesIndex
  - ExerciseIndexItem
* ExerciseDetail

### Stores
* Exercise

### Actions
* `ApiActions.receiveAllExercises`
* `ApiActions.receiveOneExercise`
* `ApiActions.destroyExercise`
* `ExerciseActions.fetchAllExercises`
* `ExerciseActions.fetchOneExercise`
* `ExerciseActions.createExercise`
* `ExerciseActions.updateExercise`
* `ExerciseActions.deleteExercise`

### ApiUtil
* `ApiUtil.fetchAllExercises`
* `ApiUtil.fetchOneExercise`
* `ApiUtil.createExercise`
* `ApiUtil.editExercise`
* `ApiUtil.deleteExercise`

## Gems/Libraries
