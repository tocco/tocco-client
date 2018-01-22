import actionTypes from '../../actionTypes'
import handleSimpleAction from './simpleAction'
export default {
  [actionTypes.SIMPLE]: handleSimpleAction
}
