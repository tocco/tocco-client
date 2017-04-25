import listReducer, {sagas as listSagas} from './list'
import searchFormReducer, {sagas as searchFormSagas} from './searchForm'

export default {
  list: listReducer,
  searchForm: searchFormReducer
}

export const sagas = [
  listSagas,
  searchFormSagas
]
