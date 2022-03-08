import {call} from 'redux-saga/effects'
import {request} from 'tocco-util'

export default function* remoteLogger(title, description, error) {
  const message = `ERROR MESSAGE: ${error.message} \nSTACK: ${error.stack ? error.stack.substring(0, 1000) : '-'}`
  yield call(request.executeRequest, `log?level=error&message=${encodeURI(message)}`, {method: 'POST'})
}
