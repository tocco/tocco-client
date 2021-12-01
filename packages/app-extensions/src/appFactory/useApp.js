import {useEffect, useState} from 'react'

const useApp = ({initApp, props, packageName, externalEvents = []}) => {
  const [app, setApp] = useState(null)

  useEffect(() => {
    setApp(initApp(packageName, props, getEvent(externalEvents, props)))
  }, [])

  return {
    component: app ? app.component : null,
    setApp,
    store: app?.store
  }
}

export const getEvent = (externalEvents, props) => externalEvents.reduce((acc, event) => ({
  ...acc,
  ...(props[event] ? {[event]: props[event]} : {})
}), {})

export default useApp
