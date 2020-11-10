import store from 'store2';
import * as templates from './templates';
import { INITIAL_DATA, VALUES } from './config';
import { isMoreNDaysBetweenDates, getDateAsYMD } from './utils';

(function () {
  const _$ = {};
  const _ = {
    data: {}
  }

  function _updateCompletion() {
    let completion = 0;
    let totalGoal = 0;
    let totalDone = 0

    _.data.exercises.forEach(exercise => {
      totalGoal += exercise.goal;
      totalDone += exercise.done;
    });

    completion = Math.floor(totalDone * 100 / totalGoal);

    _$.completion.innerHTML = templates.completion(completion);

    _$.congratulations.setAttribute('hidden', '')
    if (completion >= 100) _$.congratulations.removeAttribute('hidden')
  }

  /**
   * @param  {number} index
   */
  function _updateExercise(index) {
    const id = _.data.exercises[index].id;
    const $exercise = _$.items.querySelector(`#exercise-${id}`);

    $exercise.innerHTML = templates.itemContent(_.data.exercises[index])
  }

  function _renderExercises() {
    _$.items.innerHTML = templates.items(_.data.exercises)
  }

  function _saveStorage() {
    store(VALUES.storageKey, _.data)
  }

  function _setElements() {
    _$.completion = document.getElementById('completion');
    _$.items = document.getElementById('items');
    _$.congratulations = document.getElementById('congratulations');
  }

  function _onClick(event) {
    if (!event.target.classList.contains('btn')) return

    const index = _.data.exercises.findIndex(i => i.id === +event.target.dataset.exercise);

    if (_.data.exercises[index].done + +event.target.dataset.count >=0) {
      _.data.exercises[index].done += +event.target.dataset.count;
      _.data.exercises[index].completion =
        Math.floor(_.data.exercises[index].done * 100 / _.data.exercises[index].goal);

      _saveStorage();
      _updateExercise(index);
      _updateCompletion();
    }
  }

  function _setEventListeners() {
    _$.items.addEventListener('click', _onClick);
  }

  function _resetData() {
    _.data.date = getDateAsYMD(new Date());
    _.data.exercises = INITIAL_DATA.exercises;
  }

  function _init() {
    const today = getDateAsYMD(new Date());
    _setElements();
    _setEventListeners();

    // Prefill the data object if we have anything stored
    if (store(VALUES.storageKey)) {
      _.data = store(VALUES.storageKey)
    }

    if (!store(VALUES.storageKey) || isMoreNDaysBetweenDates(0, _.data.date, today)) _resetData()

    _saveStorage();
    _updateCompletion();
    _renderExercises();
  }

  _init()
})();