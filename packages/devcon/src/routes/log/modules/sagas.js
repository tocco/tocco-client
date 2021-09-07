import {socket} from 'tocco-app-extensions'
import {all, call} from 'redux-saga/effects'

import * as actions from './actions'

export default function* mainSagas() {
  yield all([
    call(initSocket)
  ])
}

export function* initSocket() {
  const params = {
    name: 'logging',
    messageReceivedAction: actions.receiveEntry
  }
  yield call(socket.connectSocket, params)
}
