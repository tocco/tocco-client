import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input
export const inputEditSelector = state => state.inputEdit

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_TABLE, initialize),
    takeLatest(actions.LOAD_DATA, loadData),
    takeEvery(actions.UPDATE_VALUE, updateValue),
    takeLatest(actions.SET_SORTING, sortData)
  ])
}

export function* initialize() {
  const {inputEntityKey} = yield select(inputSelector)
  const [editForm, dataForm] = yield all([
    call(rest.requestSaga, `inputEdit/${inputEntityKey}/form`),
    call(rest.fetchForm, 'Input_edit_data', 'list')
  ])
  yield put(actions.setEditForm({inputEditForm: editForm.body}))
  yield put(actions.setDataForm({inputDataForm: dataForm}))
  yield call(loadData)
}

export function* sortData({payload}) {
  yield call(loadData, payload.sorting)
}

export function* loadData(action, sorting) {
  const {inputEntityKey} = yield select(inputSelector)
  const data = yield call(rest.requestSaga, `inputEdit/${inputEntityKey}/data/search`, {
    method: 'POST',
    body: {
      sorting: sorting || (yield select(inputEditSelector)).sorting
    }
  })
  yield put(actions.setData({data: data.body}))
}

export function* updateValue({payload: {inputDataKey, node, value}}) {
  const {inputEntityKey} = yield select(inputSelector)
  yield put(actions.setValue(inputDataKey, node, value))
  const response = yield call(rest.requestSaga, `inputEdit/${inputEntityKey}/data`,
    {
      method: 'POST',
      body: {
        inputDataKey: inputDataKey,
        node: node,
        value: value
      }
    }
  )
  yield handleResponse(response)
}

function* handleResponse(response) {
  const values = response.body.calculatedValues
  if (values) {
    const actionsToPut = values.map(value => actions.setValue(value.inputDataKey, value.node, value.value))
    yield all(actionsToPut.map(action => put(action)))
  }
}
