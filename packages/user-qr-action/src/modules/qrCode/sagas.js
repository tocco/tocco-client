import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeEvery(actions.FETCH_DATA, fetchData)
  ])
}

export function* fetchData() {
  const {selection} = yield select(inputSelector)

  const userKey = getSingleKey(selection)

  const query = {
    paths: [
      'firstname',
      'lastname',
      'c_address',
      'phone_mobile',
      'phone_company',
      'phone_private',
      'email',
      'email_alternative',
      'birthdate'
    ]
  }

  try {
    const entity = yield call(rest.fetchEntity, 'User', userKey, query)

    let data = null

    if (entity) {
      data = {}
      Object.entries(entity.paths).forEach(([path, bean]) => {
        if (bean && bean.value) {
          data[path] = bean.value
        }
      })
    }

    yield put(actions.setData(data))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(actions.setData(null))
  }
}

export const getSingleKey = selection => {
  if (selection.entityName !== 'User') {
    throw new Error('Only selection of User supported')
  }
  if (selection.type !== 'ID') {
    throw new Error('Only ID selection type supported')
  }
  if (!selection.ids || selection.ids.length !== 1) {
    throw new Error('Exactly one user must be selected')
  }
  return selection.ids[0]
}
