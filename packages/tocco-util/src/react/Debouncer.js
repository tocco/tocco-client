import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import useDebounce from './useDebounce'

/**
 Higher-order-component to wrap a input Component. It will debounce the onChange.
 */
const Debouncer = (Component, delay = 300) => {
  function Comp(props) {
    const [internalValue, setInternalValue] = useState(props.value)
    const debouncedValue = useDebounce(internalValue, delay)

    const oldValue = useRef(props.value)

    useEffect(() => {
      if (internalValue !== props.value) {
        setInternalValue(props.value)
      }
    }, [props.value])

    useEffect(() => {
      if (oldValue.current !== debouncedValue) {
        props.onChange(debouncedValue)
        oldValue.current = debouncedValue
      }
    }, [debouncedValue])

    return (
      <Component {...props} value={internalValue} onChange={setInternalValue}/>
    )
  }

  Comp.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  return Comp
}

export default Debouncer
