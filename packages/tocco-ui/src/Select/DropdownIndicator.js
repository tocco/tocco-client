import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

const DropdownIndicator = props =>
  props.isDisabled
    ? null
    : <span>
      <Button
        icon="chevron-down"
        look="ball" />
    </span>

DropdownIndicator.propTypes = {
  /**
   * Whether the user can edit the value or not.
   */
  isDisabled: PropTypes.bool
}

export default DropdownIndicator
