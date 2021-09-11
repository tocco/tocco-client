import React from 'react'
import PropTypes from 'prop-types'
import {StatedValue} from 'tocco-ui'
import Range from 'tocco-ui/src/Range'

const LogForm = ({active, elapsed, setActive, setElapsed}) => {
  const handleActiveChange = e => {
    setActive(e.target.checked)
  }

  const handleElapsedChange = value => {
    setElapsed(value)
  }

  return (
    <div>
      <StatedValue label="Active" fixLabel>
        <input type="checkbox" checked={active} onChange={handleActiveChange}/>
      </StatedValue>
      <StatedValue label="Elapsed" hasValue={!!elapsed}>
        <Range
        fromText="from"
        toText="to"
        type="number"
        value={elapsed}
        options={{
          postPointDigits: 0,
          fixedDecimalScale: true
        }}
        events={{
          onChange: handleElapsedChange
        }}
      />
      </StatedValue>
    </div>
  )
}

LogForm.propTypes = {
  active: PropTypes.bool.isRequired,
  elapsed: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number
    })
  ]),
  setActive: PropTypes.func.isRequired,
  setElapsed: PropTypes.func.isRequired
}

export default LogForm
