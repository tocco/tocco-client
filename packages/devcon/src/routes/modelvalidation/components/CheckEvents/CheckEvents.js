import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

import CheckEventGroup from './CheckEventGroup'

const CheckEvents = ({checkEvents, selection, setSelected, generateSql, generateChangelog}) => (
  <div>
    {Object.keys(checkEvents).length > 0 && (
      <>
        <Button look="raised" onClick={generateSql} disabled={selection.size === 0}>
          Generate SQL {selection.size > 0 && `(${selection.size})`}
        </Button>
        <Button look="raised" onClick={generateChangelog} disabled={selection.size === 0}>
          Generate Changelog {selection.size > 0 && `(${selection.size})`}
        </Button>
      </>
    )}
    <div>{Object.keys(checkEvents).sort().map(eventType => (
      <CheckEventGroup
        key={eventType}
        type={eventType}
        events={checkEvents[eventType]}
        selection={selection}
        setSelected={setSelected}
      />
    ))}</div>
  </div>
)

CheckEvents.propTypes = {
  checkEvents: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })).isRequired
  ).isRequired,
  selection: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  generateSql: PropTypes.func.isRequired,
  generateChangelog: PropTypes.func.isRequired
}

export default CheckEvents
