import inputEditTableReducer, {sagas as inputEditTableSagas} from './inputEditTable'
import inputEditSearchReducer, {sagas as inputEditSearchSagas} from './inputEditSearch'
import inputEditPaginationReducer, {sagas as inputEditPaginationSagas} from './inputEditPagination'
import inputEditReducer from './inputEdit'

export default {
  inputEdit: inputEditReducer,
  inputEditTable: inputEditTableReducer,
  inputEditSearch: inputEditSearchReducer,
  inputEditPagination: inputEditPaginationReducer
}

export const sagas = [
  inputEditTableSagas,
  inputEditSearchSagas,
  inputEditPaginationSagas
]
