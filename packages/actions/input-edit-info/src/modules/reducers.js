import inputEditInfoReducer, {sagas as inputEditInfoSaga} from './inputEditInfo'

export default {
  inputEditInfo: inputEditInfoReducer
}

export const sagas = [inputEditInfoSaga]
