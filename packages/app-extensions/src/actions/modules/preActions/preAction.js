import {call} from 'redux-saga/effects'

export default preAction =>
  function* (definition, selection, config) {
    let abort = false
    let i = 0
    let params = {}

    while (!abort && preAction[i]) {
      const handler = preAction[i]
      if (handler.shouldRun(definition)) {
        const response = yield call(handler.run, params, definition, selection, config)

        abort = response.abort
        params = {...params, ...response.params}
      }
      i++
    }

    return {abort, params}
  }
