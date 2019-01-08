import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

const DropdownIndicator = props =>
  !props.isDisabled
  && <span>
    <Button
      icon="chevron-down"
      look="ball"
      tabIndex={-1} />
  </span>

DropdownIndicator.propTypes = {
  /**
   * Whether the user can edit the value or not.
   */
  isDisabled: PropTypes.bool
}

export default DropdownIndicator
