import {put} from 'redux-saga/effects'

import {navigateToCreate, navigateToAction, toggleMarkings} from './modules/list/actions'

export default input => ({
  new: function* () {
    yield put(navigateToCreate(input.parent && input.parent.relationName))
  },
  fullscreen: function* (definition, selection) {
    yield put(navigateToAction(definition, selection))
  },
  mark: function* (definition, selection) {
    yield put(toggleMarkings(selection))
  }
})
