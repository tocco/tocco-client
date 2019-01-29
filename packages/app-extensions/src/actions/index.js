import {isAction} from './actions'
import addToStore from './addToStore'
import * as actions from './modules/actions'
import Action from './containers/ActionContainer'
import {getSingleEntitySelection} from './utils/selection'

export default {
  isAction,
  Action,
  addToStore,
  actions,
  getSingleEntitySelection
}
