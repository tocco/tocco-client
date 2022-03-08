import inputEditReducer, {sagas as inputEditSagas} from './inputEdit'
import inputEditInformationReducer, {sagas as inputEditInformationSagas} from './inputEditInformation'
import inputEditPaginationReducer, {sagas as inputEditPaginationSagas} from './inputEditPagination'
import inputEditSearchReducer, {sagas as inputEditSearchSagas} from './inputEditSearch'
import inputEditTableReducer, {sagas as inputEditTableSagas} from './inputEditTable'

export default {
  inputEdit: inputEditReducer,
  inputEditTable: inputEditTableReducer,
  inputEditSearch: inputEditSearchReducer,
  inputEditPagination: inputEditPaginationReducer,
  inputEditInformation: inputEditInformationReducer
}

export const sagas = [
  inputEditSagas,
  inputEditTableSagas,
  inputEditSearchSagas,
  inputEditPaginationSagas,
  inputEditInformationSagas
]
