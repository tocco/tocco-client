import {delay} from 'redux-saga'
// import _uniq from 'lodash/uniq'
import {call, put, fork, select, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
export const searchFormSelector = state => state.searchForm
export const inputSelector = state => state.input

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SET_SEARCH_INPUT, setSearchTerm),
    fork(takeLatest, actions.RESET, setSearchTerm)
  ]
}

export function* loadSearchForm(formDefinition, formBase) {
  if (formDefinition.length === 0) {
    formDefinition = yield call(fetchForm, formBase + '_search', searchFormTransformer)
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* loadPreselectedRelationEntities(formDefinition, entityModel, searchInputs) {
  // TODO
  // const relationFields = formDefinition.filter(searchField => [
  //   'ch.tocco.nice2.model.form.components.simple.MultiSelectBox',
  //   'ch.tocco.nice2.model.form.components.simple.SingleSelectBox']
  //      .includes(searchField.type)).map(field => field.name)
  //
  // const relationFieldsWithValue = relationFields.filter(relationField => {
  //   const value = searchInputs[relationField]
  //   return (value instanceof Array && value.length > 0) || (!(value instanceof Array) && value)
  // })
  // const targetEntities = _uniq(
  //  relationFieldsWithValue.map(relationField => (entityModel[relationField].targetEntity))
  // )
  // yield targetEntities.map(targetEntity => put(loadRelationEntity(targetEntity)))
}

export function* getEntityModel() {
  const input = yield select(inputSelector)
  return input.entityModel
}

export function* initialize() {
  let {formDefinition, searchInputs} = yield select(searchFormSelector)
  const {formBase} = yield select(inputSelector)
  const entityModel = yield call(getEntityModel)
  formDefinition = yield call(loadSearchForm, formDefinition, formBase)
  yield call(loadPreselectedRelationEntities, formDefinition, entityModel, searchInputs)
}

export function* setSearchTerm() {
  yield call(delay, 400)
  const {searchValues} = yield select(searchFormSelector)
  yield put(actions.searchTermChange(searchValues))
}
