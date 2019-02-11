import {call} from 'redux-saga/effects'

export default function* remoteLogger(title, description, error) {
  const message = `ERROR MESSAGE: ${error.message} \nSTACK: ${error.stack ? error.stack.substring(0, 1000) : '-'}`
  const options = {
    method: 'POST',
    credentials: 'include'
  }
  yield call(fetch, `${__BACKEND_URL__}/nice2/log?level=error&message=${encodeURI(message)}`, options)
}
