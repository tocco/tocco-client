import actionTypes from '../../actionTypes'
import handleSimpleAction from './simpleAction'
import handleReportAction from './report'
import handleClientAction from './clientAction'

export default {
  [actionTypes.SIMPLE]: handleSimpleAction,
  [actionTypes.REPORT]: handleReportAction,
  [actionTypes.CLIENT]: handleClientAction
}
