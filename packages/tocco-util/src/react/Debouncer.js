/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import useDebounce from './useDebounce'

/**
 Higher-order-component to wrap a input Component. It will debounce the change function.
 */
const Debouncer = (Component, delay = 200, func = 'onChange') => {
  const Comp = React.forwardRef((props, ref) => {
    const [internalValue, setInternalValue] = useState(props.value)
    const [debouncedValue, setDebouncedValue] = useDebounce(internalValue, delay)

    const oldValue = useRef(props.value)

    useEffect(() => {
      // props.value has explicitly changed from outside
      if (internalValue !== props.value && internalValue === debouncedValue) {
        setInternalValue(props.value)
        // reset debounce value to accept props.value changes anytime (ignore delay in this case)
        setDebouncedValue(props.value)
        oldValue.current = props.value
      }
    }, [props.value])

    useEffect(() => {
      if (oldValue.current !== debouncedValue) {
        props[func](debouncedValue)
        oldValue.current = debouncedValue
      }
    }, [debouncedValue])

    return (
      <Component {...props} value={internalValue} {...{[func]: setInternalValue}} ref={ref}/>
    )
  })

  Comp.propTypes = {
    [func]: PropTypes.func,
    value: PropTypes.any
  }

  return Comp
}

export default Debouncer
