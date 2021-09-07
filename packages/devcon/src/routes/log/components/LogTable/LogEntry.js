import React, {useState} from 'react'
import PropTypes from 'prop-types'

import ExceptionDetails from './ExceptionDetails'
import {StyledLogEntry, StyledMessage, StyledTime} from './StyledLogEntry'

const LogEntry = ({entry}) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    if (entry.exception) {
      setExpanded(!expanded)
    }
  }

  return (
    <StyledLogEntry level={entry.level}>
      <StyledMessage onClick={handleClick} expandable={!!entry.exception}>{entry.message}</StyledMessage>
      <StyledTime>{new Date(entry.timestamp).toLocaleString()}</StyledTime>
      {expanded && <ExceptionDetails exception={entry.exception}/>}
    </StyledLogEntry>
  )
}

LogEntry.propTypes = {
  entry: PropTypes.shape({
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    exception: PropTypes.shape({
      detailMessage: PropTypes.string.isRequired,
      stackTrace: PropTypes.arrayOf(PropTypes.shape({
        declaringClass: PropTypes.string.isRequired,
        methodName: PropTypes.string.isRequired,
        lineNumber: PropTypes.number.isRequired
      })).isRequired
    })
  }).isRequired
}

export default LogEntry
