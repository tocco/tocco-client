import Notifications from './components/Notifications'
import {blockingInfo, removeBlockingInfo} from './modules/blocking/actions'
import NotificationCenter from './modules/center/NotificationCenter'
import {yesNoQuestion, confirm} from './modules/interactive/actions'
import {modal, removeModal} from './modules/modal/actions'
import {connectSocket, closeSocket} from './modules/socket/actions'
import {toaster, removeToaster} from './modules/toaster/actions'
import {addToStore} from './notification'

export default {
  addToStore,
  Notifications,
  NotificationCenter,
  confirm,
  yesNoQuestion,
  blockingInfo,
  removeBlockingInfo,
  modal,
  removeModal,
  toaster,
  removeToaster,
  connectSocket,
  closeSocket
}
