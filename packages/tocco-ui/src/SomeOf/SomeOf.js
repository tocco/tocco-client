import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../Typography'
/**
 * Use <SomeOf> to display an amount in relation to a total.
 */
const SomeOf = props => <Typography.Span>{props.some} / {props.of}</Typography.Span>

SomeOf.defaultProps = {
  some: 0
}

SomeOf.propTypes = {
  /**
   * Any number from 0 to a total. Default value is 0.
   */
  some: PropTypes.number,
  /**
   * A number representing a total.
   */
  of: PropTypes.number.isRequired

}

export default SomeOf
