import {navigateToCreate} from './modules/entityDetail/actions'

import {put} from 'redux-saga/effects'

export default {
  'new': function* () {
    yield put(navigateToCreate())
  }
}
