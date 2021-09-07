import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import LogEntry from './LogEntry'
import {StyledLogTable} from './StyledLogEntry'

const LogTable = ({entries}) => (
  <StyledLogTable>
    {entries.length > 0
      ? entries.map(entry => <LogEntry key={entry.key} entry={entry}/>)
      : <Typography.Span>No entries so far.</Typography.Span>
    }
  </StyledLogTable>
)

LogTable.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired
}

export default LogTable
