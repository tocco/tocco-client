import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {
  StyledLogEntry,
  StyledStatementHeader,
  StyledStatement,
  StyledTime,
  StyledElapsedContainer,
  StyledElapsed
} from './StyledLogEntry'

const LogEntry = ({entry}) => {
  const [expanded, setExpanded] = useState(false)

  const truncate = entry.sql.length > 100

  const handleClick = () => {
    if (truncate) {
      setExpanded(!expanded)
    }
  }

  const header = truncate ? entry.sql.substr(0, 100) + '...' : entry.sql

  return (
    <StyledLogEntry>
      <StyledStatementHeader expandable={truncate} onClick={handleClick}>{header}</StyledStatementHeader>
      {expanded && <StyledStatement>{entry.sql}</StyledStatement>}
      <StyledTime>{new Date(entry.timestamp.iMillis).toLocaleString()}</StyledTime>
      <StyledElapsedContainer>
        <StyledElapsed elapsed={entry.elapsed}>{entry.elapsed} ms</StyledElapsed>
      </StyledElapsedContainer>
    </StyledLogEntry>
  )
}

LogEntry.propTypes = {
  entry: PropTypes.shape({
    sql: PropTypes.string.isRequired,
    timestamp: PropTypes.shape({
      iMillis: PropTypes.number.isRequired
    }).isRequired,
    elapsed: PropTypes.number.isRequired
  }).isRequired
}

export default LogEntry
