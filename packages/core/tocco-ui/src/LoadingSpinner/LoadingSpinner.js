import {faCircleNotch} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

/**
 * Spinner that indicates a loading process
 */
const LoadingSpinner = ({size, style}) => (
  <FontAwesomeIcon {...style} style={{fontSize: size}} spin icon={faCircleNotch} />
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
