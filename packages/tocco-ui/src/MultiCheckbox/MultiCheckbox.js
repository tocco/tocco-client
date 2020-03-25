import PropTypes from 'prop-types'
import React, {useLayoutEffect, useRef} from 'react'

const checkboxValues = {
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
  UNCHECKED: 'unchecked'
}

/**
 * Use <MultiCheckbox> to display if none, some or all items of a portion are selected.
 */
const MultiCheckbox = ({value, onChange}) => {
  const inputEl = useRef(null)
  const handleOnChange = e => {
    if (value === checkboxValues.INDETERMINATE) {
      onChange(checkboxValues.UNCHECKED)
    } else {
      onChange(e.target.checked ? checkboxValues.CHECKED : checkboxValues.UNCHECKED)
    }
  }

  useLayoutEffect(() => {
    inputEl.current.indeterminate = (value === checkboxValues.INDETERMINATE)
    inputEl.current.checked = (value === checkboxValues.CHECKED)
  }, [value])

  return (
    <input
      ref={inputEl}
      onChange={handleOnChange}
      type="checkbox"
    />
  )
}

MultiCheckbox.propTypes = {
  /**
   *  State with 'checked' if checkbox is checked. State with 'indeterminate' if checkbox
   *  is neither checked nor unchecked.
   */
  value: PropTypes.oneOf(Object.values(checkboxValues)),
  /**
   * Callback is executed on change. Callback receives new checkbox state, which is 'checked' or 'unchecked'.
   */
  onChange: PropTypes.func.isRequired
}

export default MultiCheckbox
