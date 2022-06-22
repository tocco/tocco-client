import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {bundle} from 'tocco-util'

const DynamicAction = ({packageName, appName, ...props}) => {
  const ActionApp = bundle.useBundledApp({
    packageName,
    appName
  })

  return ActionApp ? <ActionApp {...props} /> : <LoadMask />
}

DynamicAction.propTypes = {
  packageName: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired
}

export default DynamicAction
