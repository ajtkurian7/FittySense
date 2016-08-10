const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const ExerciseStore = new Store(AppDispatcher);

let _exercises = [];

const _addExercises = (arr) => {
  _exercises = arr;
};

const _deleteExercise = (exercise) => {
  let retArr = [];
  for (var i = 0; i < _exercises.length; i++) {
      if (_exercises[i].id !== exercise.id) {
        retArr.push(Object.assign({}, _exercises[i]));
      }
  }

  _exercises = retArr;
};

ExerciseStore.all = () => {
  let returnArr = [];

  for (var i = 0; i < _exercises.length; i++) {
    returnArr.push(Object.assign({},_exercises[i]));
  }

  return returnArr;

};


ExerciseStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case "SAVED_EXERCISES":
      _addExercises(payload.exercises);
      ExerciseStore.__emitChange();
      break;
    case "DELETE_EXERCISE":
      _deleteExercise(payload.exercise);
      ExerciseStore.__emitChange();
      break;
  }
};

module.exports = ExerciseStore;
