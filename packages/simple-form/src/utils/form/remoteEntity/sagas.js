import {call, put} from 'redux-saga/effects'
import * as actions from './actions'
import {selectEntitiesTransformer} from './utils'
import {fetchEntities} from '../../../../../tocco-util/src/rest'

export function* loadRemoteEntity({payload}) {
  const {field, entityName, searchTerm} = payload
  yield put(actions.setRemoteEntityLoading(field))
  const limit = 100

  const fetchParams = {
    limit: limit + 1,
    fields: [],
    relations: [],
    searchInputs: {
      _search: searchTerm
    }
  }

  const entities = yield call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer)
  const moreOptionsAvailable = entities.length > limit
  yield put(actions.setRemoteEntity(field, entities.splice(0, limit), moreOptionsAvailable))
}
