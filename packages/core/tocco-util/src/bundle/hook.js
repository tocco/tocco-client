import {useState, useEffect} from 'react'

import remoteLogger from '../remoteLogger'
import ErrorComponent from './ErrorComponent'
import utils from './utils'

const useBundledApp = ({packageName, appName}) => {
  const [Comp, setComp] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const bundle = await utils.loadBundle(packageName, appName)
        const {
          app: {App, setWebpacksPublicPath}
        } = bundle

        setWebpacksPublicPath(utils.getDistPath(packageName))
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
