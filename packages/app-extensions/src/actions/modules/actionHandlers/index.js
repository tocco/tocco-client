import actionTypes from '../../actionTypes'
import handleSimpleAction from './simpleAction'
import handleReportAction from './report'

export default {
  [actionTypes.SIMPLE]: handleSimpleAction,
  [actionTypes.REPORT]: handleReportAction
}
