import {useState, useEffect} from 'react'

import remoteLogger from '../remoteLogger'
import ErrorComponent from './ErrorComponent'
import {loadBundle} from './load'
import {getDistPath} from './utils'

const useBundledApp = ({packageName, appName}) => {
  const [Comp, setComp] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const bundle = await loadBundle(packageName, appName)
        const {
          app: {App, setWebpacksPublicPath}
        } = bundle

        setWebpacksPublicPath(getDistPath(packageName))
        setComp(() => App)
      } catch (error) {
        remoteLogger.logError(error)
        setComp(() => () => <ErrorComponent packageName={packageName} appName={appName} />)
      }
    }
    load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return Comp
}

export {useBundledApp}
