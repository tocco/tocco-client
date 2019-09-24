import PropTypes from 'prop-types'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons/faCircleNotch'

/**
 * Spinner that indicates a loading process
 */
const LoadingSpinner = ({size, style}) => (
  <FontAwesomeIcon
    {...style}
    style={{fontSize: size}}
    spin
    icon={faCircleNotch}
  />
)

LoadingSpinner.propTypes = {
  /**
   * Specify width and height.
   */
  size: PropTypes.string,
  /**
   * css properties object. color can be used to set the color of the spinner
   */
  style: PropTypes.object
}

export default LoadingSpinner
