import {put} from 'redux-saga/effects'

import {navigateToCreate, navigateToAction} from './modules/entityDetail/actions'

export default {
  new: function* () {
    yield put(navigateToCreate())
  },
  fullscreen: function* (definition, selection) {
    yield put(navigateToAction(definition, selection))
  }
}
