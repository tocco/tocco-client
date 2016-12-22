import {takeLatest, delay} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import * as api from '../../util/api'

export const searchValuesSelector = state => state.searchForm.searchValues

export default function* sagas() {
  yield [
    fork(takeLatest, actions.SET_FORM, initializeSearchForm),
    fork(takeLatest, actions.SET_SEARCH_INPUT, setSearchTerm),
    fork(takeLatest, actions.RESET, setSearchTerm)
  ]
}

export function* initializeSearchForm(action) {
  const {entityName, formName} = action.payload

  const [formDefinition, entityModel] = yield [
    call(api.fetchSearchForm, formName),
    call(api.fetchModel, entityName)
  ]

  yield put(actions.setEntityModel(entityModel))
  yield put(actions.setFormDefinition(formDefinition))

  const relationEntities = yield formDefinition.filter(searchField =>
    searchField.type === 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox'
  ).map(searchField => {
    const relationName = searchField.name
    const entityName = entityModel[relationName].targetEntity
    return call(api.fetchRelationRecords, entityName)
  })

  const relationEntitiesTransformed = yield call(api.transformRelationEntitiesResults, relationEntities)

  yield put(actions.setRelationEntities(relationEntitiesTransformed))
}

export function* setSearchTerm() {
  yield call(delay, 400)
  const searchValues = yield select(searchValuesSelector)
  yield put(actions.searchTermChange(searchValues))
}
