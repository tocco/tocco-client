import PropTypes from 'prop-types'

import LazyAction from '../LazyAction'

const ActionView = props => {
  const {
    router: {history, location, match}
  } = props

  const navigateBack = () => {
    const originUrl = location.state.originUrl || '/'
    history.replace(originUrl)
  }

  return (
    <LazyAction
      appId={match.params.appId}
      onSuccess={navigateBack}
      onError={navigateBack}
      onCancel={navigateBack}
      {...props}
    />
  )
}

ActionView.propTypes = {
  router: PropTypes.shape({
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }).isRequired
}

export default ActionView
