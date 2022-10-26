import PropTypes from 'prop-types'

import Icon from '../Icon'

/**
 * Spinner that indicates a loading process
 */
const LoadingSpinner = ({size, style, icon}) => (
  <Icon {...style} style={{fontSize: size}} spin icon={icon || 'circle-notch'} />
)

LoadingSpinner.propTypes = {
  /**
   * Specify width and height.
   */
  size: PropTypes.string,
  /**
   * css properties object. color can be used to set the color of the spinner
   */
  style: PropTypes.object,
  /**
   * font awesome icon object to user, solid circle notch by default
   */
  icon: PropTypes.string
}

export default LoadingSpinner
