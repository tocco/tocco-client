import React from 'react'
import PropTypes from 'prop-types'

import {StyledExceptionDetails, StyledDetailMessage, StyledStackTrace} from './StyledLogEntry'

const formatLine = line => `${line.declaringClass}.${line.methodName}:${line.lineNumber}`

const ExceptionDetails = ({exception}) => (
  <StyledExceptionDetails>
    <StyledDetailMessage>{exception.detailMessage}</StyledDetailMessage>
    <StyledStackTrace>{
      exception.stackTrace.map((line, index) =>
      <div key={index}>{formatLine(line)}</div>)
    }</StyledStackTrace>
  </StyledExceptionDetails>
)

ExceptionDetails.propTypes = {
  exception: PropTypes.shape({
    detailMessage: PropTypes.string.isRequired,
    stackTrace: PropTypes.arrayOf(PropTypes.shape({
      declaringClass: PropTypes.string.isRequired,
      methodName: PropTypes.string.isRequired,
      lineNumber: PropTypes.number.isRequired
    })).isRequired
  }).isRequired
}

export default ExceptionDetails
