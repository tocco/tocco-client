import {isAction} from './actions'
import addToStore from './addToStore'
import Action from './containers/ActionContainer'
import * as actions from './modules/actions'
import {getSingleEntitySelection} from './utils/selection'

export default {
  isAction,
  Action,
  addToStore,
  actions,
  getSingleEntitySelection
}
