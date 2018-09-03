import {reducer as form} from 'redux-form'

import entityListReducer, {sagas as entityListSagas} from './entityList'
import listReducer, {sagas as listSagas} from './list'
import searchFormReducer, {sagas as searchFormSagas} from './searchForm'

export default {
  entityList: entityListReducer,
  list: listReducer,
  searchForm: searchFormReducer,
  form
}

export const sagas = [
  entityListSagas,
  listSagas,
  searchFormSagas
]
