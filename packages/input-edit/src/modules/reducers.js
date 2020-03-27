import inputEditTableReducer, {sagas as inputEditTableSagas} from './inputEditTable'
import inputEditSearchReducer, {sagas as inputEditSearchSagas} from './inputEditSearch'
import inputEditPaginationReducer, {sagas as inputEditPaginationSagas} from './inputEditPagination'

export default {
  inputEditTable: inputEditTableReducer,
  inputEditSearch: inputEditSearchReducer,
  inputEditPagination: inputEditPaginationReducer
}

export const sagas = [
  inputEditTableSagas,
  inputEditSearchSagas,
  inputEditPaginationSagas
]
