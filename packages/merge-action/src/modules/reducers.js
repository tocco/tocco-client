import mergeStrategy from './mergeStrategy/'
import { sagas as wizardSagas } from './wizard/'
import mergeMatrix, { sagas as mergeMatrixSagas } from './mergeMatrix/'
import {intlReducer} from 'react-intl-redux'

export default {
  mergeMatrix,
  mergeStrategy,
  intl: intlReducer
}

export const sagas = [
  mergeMatrixSagas,
  wizardSagas
]
