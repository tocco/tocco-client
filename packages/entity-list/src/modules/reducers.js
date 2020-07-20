import {reducer as form} from 'redux-form'

import entityListReducer, {sagas as entityListSagas} from './entityList'
import listReducer, {sagas as listSagas} from './list'
import searchFormReducer, {sagas as searchFormSagas} from './searchForm'
import selectionReducer, {sagas as selectionSagas} from './selection'
import preferencesReducer, {sagas as preferencesSaga} from './preferences'

export default {
  entityList: entityListReducer,
  list: listReducer,
  searchForm: searchFormReducer,
  form,
  selection: selectionReducer,
  preferences: preferencesReducer
}

export const sagas = [
  entityListSagas,
  listSagas,
  searchFormSagas,
  selectionSagas,
  preferencesSaga
]
