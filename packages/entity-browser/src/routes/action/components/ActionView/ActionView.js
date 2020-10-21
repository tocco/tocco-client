import React from 'react'
import PropTypes from 'prop-types'

import LazyAction from '../../../../components/LazyAction'

const ActionView = props => {
  const {appId} = props.router.match.params

  return <LazyAction appId={appId} {...props}/>
}

ActionView.propTypes = {
  router: PropTypes.shape({
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }).isRequired
}

export default ActionView
