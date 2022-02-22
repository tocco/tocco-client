import {takeLatest, all, put} from 'redux-saga/effects'
import {route} from 'tocco-util'

import * as actions from './actions'

const pathRegex = '/docs/:model/:key/:view(list|detail)'

export function* setParams({payload: {path}}) {
  const params = route.extractParamsFromPath(pathRegex, path) || {}

  yield put(actions.setParams(params))
}

export default function* mainSagas() {
  yield all([takeLatest(actions.NAVIGATE, setParams)])
}
