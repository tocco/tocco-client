import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {rest, selection as selectionUtil} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeEvery(actions.FETCH_DATA, fetchData)])
}

export function* fetchData() {
  const {selection} = yield select(inputSelector)

  const userKey = selectionUtil.getSingleKey(selection, 'User')

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
