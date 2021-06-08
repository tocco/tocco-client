import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {rest, form, externalEvents} from 'tocco-app-extensions'
import {selection as selectionUtil} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeLatest(actions.START_COPY, copy)
  ])
}

export function* copy() {
  const {selection, navigationStrategy, context: {formName}} = yield select(inputSelector)
  const entities = yield call(selectionUtil.getEntities, selection, rest.fetchEntities)

  if (entities.keys.length === 1) {
    const values = yield call(getValues, entities.entityName, entities.keys[0], formName)
    yield put(externalEvents.fireExternalEvent('onCancel'))
    yield call(navigationStrategy.navigateToCreateRelative, null, {defaultValues: values})
  } else {
    throw new Error('Invalid selection')
  }
}

export function* getValues(entityName, entityKey, formName) {
  const paths = yield call(getPaths, formName)
  const sourceEntity = yield call(rest.fetchEntity, entityName, entityKey, {paths})

  return Object.entries(sourceEntity.paths).map(([id, valueObject]) => {
    const value = valueObject.value
    if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return null
    }

    const valueTransformed = Array.isArray(value)
      ? value.map(v => v.key)
      : typeof value === 'object'
        ? value.key
        : value

    return {id, value: valueTransformed}
  }).filter(d => !!d)
}

export function* getPaths(formName) {
  const formDefinition = yield call(rest.fetchForm, formName, 'create')
  const fields = yield call(form.getFieldDefinitions, formDefinition)
  return fields.filter(f => f.ignoreCopy !== true && f.path).map(e => e.path)
}
