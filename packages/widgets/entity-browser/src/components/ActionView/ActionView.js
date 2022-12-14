import PropTypes from 'prop-types'
import {useEffect} from 'react'

import {States} from '../../states'
import LazyAction from '../LazyAction'

const ActionView = ({fireStateChangeEvent, ...props}) => {
  const {
    router: {history, location, match}
  } = props

  useEffect(() => {
    fireStateChangeEvent([States.fullscreenAction])
  }, [fireStateChangeEvent])

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
  }).isRequired,
  fireStateChangeEvent: PropTypes.func.isRequired
}

export default ActionView
