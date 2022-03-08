/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types'
import React, {useState, useEffect, useRef} from 'react'

import useDebounce from './useDebounce'

/**
 Higher-order-component to wrap a input Component. It will debounce the change function.
 */
const Debouncer = (Component, delay = 200, func = 'onChange') => {
  const Comp = React.forwardRef((props, ref) => {
    const {value} = props
    const [internalValue, setInternalValue] = useState(value)
    const debouncedValue = useDebounce(internalValue, delay)

    const oldValue = useRef(value)
    const callback = props[func]

    // only update internal value when value has changed from outside
    useEffect(() => {
      if (internalValue !== value && internalValue === debouncedValue) {
        setInternalValue(value)
        oldValue.current = value
      }
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (oldValue.current !== debouncedValue) {
        callback(debouncedValue)
        oldValue.current = debouncedValue
      }
    }, [debouncedValue, callback])

    return <Component {...props} value={internalValue} {...{[func]: setInternalValue}} ref={ref} />
  })

  Comp.propTypes = {
    [func]: PropTypes.func,
    value: PropTypes.any
  }

  return Comp
}

export default Debouncer
