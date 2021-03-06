import actionTypes from '../../actionTypes'
import handleSimpleAction from './simpleAction'
import handleReportAction from './report'
import handleCustomAction from './customAction'
import handleLegacyAction from './legacyAction'

export default {
  [actionTypes.SIMPLE]: handleSimpleAction,
  [actionTypes.REPORT]: handleReportAction,
  [actionTypes.CUSTOM]: handleCustomAction,
  [actionTypes.LEGACY]: handleLegacyAction
}
