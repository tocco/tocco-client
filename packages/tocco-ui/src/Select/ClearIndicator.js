import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledClearIndicator = styled.div`
&& {
  padding-right: 10px;
  color: #999;
  font-size: 18px;
  font-style: normal;
  cursor: pointer;
`

const ClearIndicator = props => (
  <StyledClearIndicator {...props.innerProps}>×</StyledClearIndicator>
)

ClearIndicator.propTypes = {
  innerProps: PropTypes.object
}

export default ClearIndicator
