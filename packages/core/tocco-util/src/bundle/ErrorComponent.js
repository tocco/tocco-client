import PropTypes from 'prop-types'

import nice from '../nice'

const ErrorComponent = ({packageName, appName}) => {
  if (__DEV__ || nice.getRunEnv() !== 'PRODUCTION') {
    return (
      <div>
        Fehler beim Laden der &quot;{appName}&quot; App im Package &quot;{packageName}&quot;.
      </div>
    )
  }

  return null
}

ErrorComponent.propTypes = {
  packageName: PropTypes.string,
  appName: PropTypes.string
}

export default ErrorComponent
