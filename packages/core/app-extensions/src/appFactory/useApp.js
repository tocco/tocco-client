import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _pickBy from 'lodash/pickBy'
import {useEffect, useState} from 'react'
import {react} from 'tocco-util'

import {inputChanged, setInput} from './store/input/actions'

const getInputDispatchActions = (input, prevInput) => {
  const actions = Object.keys(input).map(key => setInput(key, input[key]))
  if (actions.length > 0) {
    actions.push(inputChanged(input, prevInput))
  }
  return actions
}

const useApp = ({initApp, props, packageName, externalEvents = []}) => {
  const [app, setApp] = useState(null)
  const store = app?.store
  const component = app ? app.component : null

  const inputState = store?.getState()?.input || {}

  useEffect(() => {
    setApp(initApp(packageName, props, getEvents(externalEvents, props)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  react.useDidUpdate(() => {
    const changedProps = _pickBy(props, (value, key) => !_isEqual(value, inputState[key]))
    const prevProps = _pickBy(inputState, (_value, key) => Object.keys(changedProps).includes(key))

    if (!_isEmpty(changedProps)) {
      getInputDispatchActions(changedProps, prevProps).forEach(action => {
        store.dispatch(action)
      })
    }
  }, [props, inputState])

  return {
    component,
    setApp,
    store
  }
}

export const getEvents = (externalEvents, props) =>
  externalEvents.reduce(
    (acc, event) => ({
      ...acc,
      ...(props[event] ? {[event]: props[event]} : {})
    }),
    {}
  )

export default useApp
