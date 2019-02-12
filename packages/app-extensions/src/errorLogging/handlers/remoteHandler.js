import {call} from 'redux-saga/effects'

export default function* remoteLogger(title, description, error) {
  const message = `${title} \n${description} \n${error}`
  const options = {
    method: 'POST',
    credentials: 'include'
  }
  yield call(fetch, `${__BACKEND_URL__}/nice2/log?level=error&message=${message}`, options)
}
