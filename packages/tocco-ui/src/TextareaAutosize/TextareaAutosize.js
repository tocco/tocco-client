import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {userAgent} from 'tocco-util'
import _debounce from 'lodash/debounce'

import {StyledSizeWrapper, StyledTextarea} from './StyledComponents'

const TextareaAutosize = ({value, onChange, name, id, disabled, immutable}) => {
  const [replicatedValue, setReplicatedValue] = useState(value)
  
  // remove autosize feature for Safari to be able to type fluently
  const useAutosizeFeature = !userAgent.isSafari()
  
  const setDebouncedReplicatedValue = _debounce(setReplicatedValue, 500)

  useEffect(() => {
    if (useAutosizeFeature) {
      setDebouncedReplicatedValue(value)
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
