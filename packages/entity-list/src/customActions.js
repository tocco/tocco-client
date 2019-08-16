import {navigateToCreate} from './modules/list/actions'

import {put} from 'redux-saga/effects'

export default {
  'new': function* () {
    yield put(navigateToCreate())
  }
}
