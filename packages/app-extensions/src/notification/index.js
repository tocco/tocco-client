import {addToStore} from './notification'
import Notifications from './components/Notifications'
import {yesNoQuestion, confirm} from './modules/interactive/actions'
import {blockingInfo, removeBlockingInfo} from './modules/blocking/actions'
import {modal, removeModal} from './modules/modal/actions'
import {toaster, removeToaster} from './modules/toaster/actions'

export default {
  addToStore,
  Notifications,
  confirm,
  yesNoQuestion,
  blockingInfo,
  removeBlockingInfo,
  modal,
  removeModal,
  toaster,
  removeToaster
}
