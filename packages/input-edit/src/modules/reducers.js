import reducer, {sagas as inputEditSagas} from './inputEditTable'

export default {
  inputEdit: reducer
}

export const sagas = [inputEditSagas]
