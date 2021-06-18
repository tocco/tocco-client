import consoleHandler from './handlers/consoleHandler'
import notifierHandler from './handlers/notifierHandler'
import remoteHandler from './handlers/remoteHandler'

export default {
  console: consoleHandler,
  notification: notifierHandler,
  remote: remoteHandler
}
