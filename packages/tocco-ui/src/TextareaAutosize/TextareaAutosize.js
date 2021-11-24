import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {userAgent} from 'tocco-util'
import _throttle from 'lodash/throttle'

import {StyledSizeWrapper, StyledTextarea} from './StyledComponents'

const TextareaAutosize = ({value, onChange, name, id, disabled, immutable}) => {
  const [replicatedValue, setReplicatedValue] = useState(value)
  
  // remove autosize feature for Safari to be able to type fluently
  const useAutosizeFeature = !userAgent.isSafari()
  
  const setThrottledReplicatedValue = useCallback(_throttle(setReplicatedValue, 500, {trailing: true}), [])

  useEffect(() => {
    if (useAutosizeFeature) {
      setThrottledReplicatedValue(value)
    }
  }, [value])

  return (
    <StyledSizeWrapper
      {...(useAutosizeFeature ? {'data-replicated-value': replicatedValue} : {})}
    >
      <StyledTextarea
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        disabled={disabled}
        immutable={immutable}
        rows="1"
      />
    </StyledSizeWrapper>
  )
}

TextareaAutosize.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  immutable: PropTypes.bool
}

export default TextareaAutosize
