const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const ExerciseStore = new Store(AppDispatcher);

let _exercises = [];

const _addExercises = (arr) => {
  _exercises = arr;
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

  }
};

module.exports = ExerciseStore;
