import PropTypes from 'prop-types'
import React from 'react'
import _round from 'lodash/round'

import Button from '../Button'
import {
  inkPropTypes,
  stylingLook
} from '../utilStyles'

const affixSystemUnit = value => {
  const log10 = Math.log10(value)
  let affixedValue
  if (log10 < 3) {
    affixedValue = value
  } else if (log10 >= 3 && log10 < 6) {
    affixedValue = `${_round(value / 10 ** 3)}k`
  } else if (log10 >= 6 && log10 < 9) {
    affixedValue = `${_round(value / 10 ** 6)}M`
  } else if (log10 >= 9 && log10 < 12) {
    affixedValue = `${_round(value / 10 ** 9)}G`
  } else if (log10 >= 12 && log10 < 15) {
    affixedValue = `${_round(value / 10 ** 12)}T`
  } else {
    affixedValue = `${_round(value / 10 ** 15)}P`
  }
  return affixedValue
}

/**
 * Use <SomeOfButton> to display an amount in relation to a total.
 * Numbers greater than 999 are shortened and affixed by system unit.
 */
const SomeOfButton = props => {
  const label = `${affixSystemUnit(props.some)} / ${affixSystemUnit(props.of)}`
  return (
    <Button
      dense={props.dense}
      disabled={props.disabled}
      ink={props.ink}
      look={props.look}
      onClick={props.onClick}
      title={props.title}
      label={label}
    />
  )
}

SomeOfButton.defaultProps = {
  some: 0
}

SomeOfButton.propTypes = {
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * If true, the button can not be triggered. Disable a button rather than hide it temporarily.
   */
  disabled: PropTypes.bool,
  /**
   * Specify color palette. Default is defined by <Button>.
   */
  ink: inkPropTypes,
  /**
   * Look of button. Default is defined by <Button>.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * Function that will be triggered on click event.
   */
  onClick: PropTypes.func,
  /**
   * Any number from 0 to a total. Default value is 0.
   */
  some: PropTypes.number,
  /**
   * A number representing a total.
   */
  of: PropTypes.number.isRequired,
  /**
   * Describe button action in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string
}

export default SomeOfButton
