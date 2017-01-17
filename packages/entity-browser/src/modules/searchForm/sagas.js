import {takeLatest, delay} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {fetchModel, combineEntitiesInObject, fetchEntities} from '../../util/api/entities'

export const searchValuesSelector = state => state.searchForm.searchValues

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SET_SEARCH_INPUT, setSearchTerm),
    fork(takeLatest, actions.RESET, setSearchTerm)
  ]
}

export function* initialize({payload}) {
  const {entityName, formBase} = payload

  const [formDefinition, entityModel] = yield [
    call(fetchForm, formBase + '_search', searchFormTransformer),
    call(fetchModel, entityName)
  ]

  yield put(actions.setEntityModel(entityModel))
  yield put(actions.setFormDefinition(formDefinition))

  const relationEntities = yield formDefinition.filter(searchField =>
    searchField.type === 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox'
  ).map(searchField => {
    const relationName = searchField.name
    const entityName = entityModel[relationName].targetEntity
    return call(fetchEntities, entityName)
  })

  const relationEntitiesTransformed = yield call(combineEntitiesInObject, relationEntities)

  yield put(actions.setRelationEntities(relationEntitiesTransformed))
}

export function* setSearchTerm() {
  yield call(delay, 400)
  const searchValues = yield select(searchValuesSelector)
  yield put(actions.searchTermChange(searchValues))
}
