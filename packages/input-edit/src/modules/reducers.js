import inputEditTableReducer, {sagas as inputEditTableSagas} from './inputEditTable'
import inputEditSearchReducer, {sagas as inputEditSearchSagas} from './inputEditSearch'

export default {
  inputEditTable: inputEditTableReducer,
  inputEditSearch: inputEditSearchReducer
}

export const sagas = [
  inputEditTableSagas,
  inputEditSearchSagas
]
