import mergeStrategy from './mergeStrategy/'
import wizard, {sagas as wizardSagas} from './wizard/'
import mergeMatrix, {sagas as mergeMatrixSagas} from './mergeMatrix/'

export default {
  mergeMatrix,
  mergeStrategy,
  wizard
}

export const sagas = [
  mergeMatrixSagas,
  wizardSagas
]
