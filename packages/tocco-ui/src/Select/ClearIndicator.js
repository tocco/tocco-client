import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

const ClearIndicator = props =>
  <span {...props.innerProps}>
    <Button
      icon="times"
      look="ball" />
  </span>

ClearIndicator.propTypes = {
  innerProps: PropTypes.object
}

export default ClearIndicator
