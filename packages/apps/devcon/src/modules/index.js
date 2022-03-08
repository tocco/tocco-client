import dbRefactoring, {sagas as dbRefactoringSagas} from './dbrefactoring'
import log, {sagas as logSagas} from './log'
import modelValidation, {sagas as modelValidationSagas} from './modelvalidation'
import sqlLog, {sagas as sqlLogSagas} from './sqllog'

export default {
  log,
  dbRefactoring,
  modelValidation,
  sqlLog
}

export const sagas = [dbRefactoringSagas, logSagas, modelValidationSagas, sqlLogSagas]
