import {put} from 'redux-saga/effects'

import {navigateToCreate} from './modules/entityDetail/actions'

export default {
  'new': function* () {
    yield put(navigateToCreate())
  }
}
