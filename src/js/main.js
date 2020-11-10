import store from 'store2';
import * as templates from './templates';
import { CONFIG, VALUES } from './config';
import { isMoreNDaysBetweenDates, getDateAsYMD } from './utils';

(function () {
  const _$ = {};
  const _ = {
    data: {}
  }

  function _updateCompletion() {
    _$.completion.innerHTML = templates.completion(_.data.completed);
  }

  function _renderExercises() {
    _$.items.innerHTML = templates.items(CONFIG.exercises)
  }

  function _saveStorage() {
    store(VALUES.storageKey, _.data)
  }

  function _setElements() {
    _$.completion = document.getElementById('completion');
    _$.items = document.getElementById('items');
  }

  function _setEventListeners() {
    // _$.button.addEventListener('click', _onClick);
  }

  function _resetData() {
    _.data.date = getDateAsYMD(new Date());
    _.data.completion = 0;
  }

  function _init() {
    const today = getDateAsYMD(new Date());
    _setElements();
    _setEventListeners();

    // Prefill the data object if we have anything stored
    if (store(VALUES.storageKey)) {
      _.data = store(VALUES.storageKey)
    }

    if (!store(VALUES.storageKey) || isMoreNDaysBetweenDates(0, today, _.data.date)) _resetData()

    _saveStorage();
    _updateCompletion();
    _renderExercises();
  }

  _init()
})();