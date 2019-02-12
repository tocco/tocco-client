import {addToStore} from './notifier'
import Notifier from './components/Notifier'
import {
  info,
  confirm,
  yesNoQuestion,
  blockingInfo,
  removeBlockingInfo,
  modalComponent,
  removeModalComponent
} from './modules/actions'

export default {
  Notifier,
  addToStore,
  info,
  confirm,
  yesNoQuestion,
  blockingInfo,
  removeBlockingInfo,
  modalComponent,
  removeModalComponent
}
