import mergeStrategy from './mergeStrategy/'
import wizard, { sagas as wizardSagas } from './wizard/'
import mergeMatrix, { sagas as mergeMatrixSagas } from './mergeMatrix/'
import {intlReducer} from 'react-intl-redux'

export default {
  mergeMatrix,
  mergeStrategy,
  wizard,
  intl: intlReducer
}

export const sagas = [
  mergeMatrixSagas,
  wizardSagas
]
