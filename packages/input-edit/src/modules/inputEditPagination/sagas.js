import {all, takeLatest, call} from 'redux-saga/effects'

import * as actions from '../inputEditPagination/actions'
import {loadData} from '../inputEditTable/sagas'

export default function* sagas() {
  yield all([
    takeLatest(actions.SET_CURRENT_PAGE, setCurrentPage)
  ])
}

export function* setCurrentPage({payload: {currentPage}}) {
  yield call(loadData, {newPage: currentPage})
}
