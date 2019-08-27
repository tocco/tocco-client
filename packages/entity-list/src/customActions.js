import {put} from 'redux-saga/effects'

import {navigateToCreate} from './modules/list/actions'

export default {
  new: function* () {
    yield put(navigateToCreate())
  }
}
