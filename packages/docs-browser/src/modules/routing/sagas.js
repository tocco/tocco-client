import pathToRegexp from 'path-to-regexp'
import {takeLatest, all, put} from 'redux-saga/effects'

import * as actions from './actions'

const pathRegex = '/docs/:model/:key/:view(list|detail)'

export function* setParams({payload: {path}}) {
  const pathParts = []
  const re = pathToRegexp(pathRegex, pathParts)
  const res = re.exec(path)

  let params = {}
  if (res !== null) {
    params = pathParts.reduce((acc, pathPart, idx) => {
      return {
        ...acc,
        [pathPart.name]: res[idx + 1]
      }
    }, {})
  }

  yield put(actions.setParams(params))
}

export default function* mainSagas() {
  yield all([takeLatest(actions.NAVIGATE, setParams)])
}
