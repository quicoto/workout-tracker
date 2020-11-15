import store from 'store2';
import * as templates from './templates';
import { INITIAL_DATA, VALUES } from './config';
import { isMoreNDaysBetweenDates, getDateAsYMD } from './utils';

(function () {
  const _$ = {};
  const _ = {
    data: {}
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

  function _renderWater() {
    _$.water.innerHTML = templates.water(_.data.water.completion)
  }

  function _saveStorage() {
    store(VALUES.storageKey, _.data)
  }

  function _setElements() {
    _$.water = document.getElementById('water');
    _$.items = document.getElementById('items');
  }

  function _onClickItems(event) {
    if (!event.target.classList.contains('btn')) return

    const index = _.data.exercises.findIndex(i => i.id === +event.target.dataset.exercise);

    if (_.data.exercises[index].done + +event.target.dataset.count >=0) {
      _.data.exercises[index].done += +event.target.dataset.count;
      _.data.exercises[index].completion =
        Math.floor(_.data.exercises[index].done * 100 / _.data.exercises[index].goal);

      _saveStorage();
      _updateExercise(index);
    }
  }

  function _onClickWater() {
    _.data.water.done++;
    _.data.water.completion = Math.floor(_.data.water.done * 100 / _.data.water.goal);
    _saveStorage();
    _renderWater();
  }

  function _setEventListeners() {
    _$.items.addEventListener('click', _onClickItems);
    _$.water.addEventListener('click', _onClickWater);
  }

  function _resetData() {
    _.data.date = getDateAsYMD(new Date());
    _.data.exercises = INITIAL_DATA.exercises;
    _.data.water = INITIAL_DATA.water;
  }

  function _init() {
    const today = getDateAsYMD(new Date());
    _setElements();
    _setEventListeners();

    // Prefill the data object if we have anything stored
    if (store(VALUES.storageKey)) {
      _.data = store(VALUES.storageKey)
    }

    if (!store(VALUES.storageKey) || isMoreNDaysBetweenDates(0, _.data.date, today)){
      _resetData();
    }

    _saveStorage();
    _renderExercises();
    _renderWater();
  }

  _init()
})();