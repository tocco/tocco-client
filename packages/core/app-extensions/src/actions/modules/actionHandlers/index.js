import actionTypes from '../../actionTypes'
import handleCustomAction from './customAction'
import handleLegacyAction from './legacyAction'
import handleReportAction from './report'
import handleSimpleAction from './simpleAction'

export default {
  [actionTypes.SIMPLE]: handleSimpleAction,
  [actionTypes.REPORT]: handleReportAction,
  [actionTypes.CUSTOM]: handleCustomAction,
  [actionTypes.LEGACY]: handleLegacyAction
}
