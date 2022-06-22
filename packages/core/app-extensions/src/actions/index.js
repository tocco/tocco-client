import actionFactory from './actionFactory'
import {isAction} from './actions'
import addToStore, {dynamicActionsAddToStore} from './addToStore'
import Action from './containers/ActionContainer'
import * as actions from './modules/actions'
import {getSingleEntitySelection} from './utils/selection'

export default {
  isAction,
  Action,
  actionFactory,
  addToStore,
  dynamicActionsAddToStore,
  actions,
  getSingleEntitySelection
}
