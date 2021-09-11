import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import LogEntry from './LogEntry'
import {StyledLogTable} from './StyledLogEntry'

const filterEntries = (entries, elapsed) => {
  if (!elapsed) {
    return entries
  }
  return entries.filter(entry => {
    if (elapsed.isRangeValue === true) {
      return entry.elapsed >= elapsed.from && entry.elapsed <= elapsed.to
    }
    return entry.elapsed >= elapsed
  })
}

const LogTable = ({entries, elapsed}) => {
  const filteredEntries = filterEntries(entries, elapsed)
  return (
    <StyledLogTable>
      {filteredEntries.length > 0
        ? filteredEntries.map(entry => <LogEntry key={entry.key} entry={entry}/>)
        : <Typography.Span>No entries so far.</Typography.Span>
      }
    </StyledLogTable>
  )
}

LogTable.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    sql: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    timestamp: PropTypes.shape({
      iMillis: PropTypes.number.isRequired
    }).isRequired
  })).isRequired,
  elapsed: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number
    })
  ])
}

export default LogTable
