import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

import ProgressBar from './ProgressBar'

const ValidationProgress = ({state, startValidation}) => {
  return (
    <div>
      <Button look="raised" pending={state.running} disabled={state.running} onClick={startValidation}>Execute</Button>
      <ProgressBar state={state}/>
    </div>
  )
}

ValidationProgress.propTypes = {
  state: PropTypes.shape({
    running: PropTypes.bool.isRequired,
    currentIndex: PropTypes.number,
    currentName: PropTypes.string,
    total: PropTypes.number
  }).isRequired,
  startValidation: PropTypes.func.isRequired
}

export default ValidationProgress
