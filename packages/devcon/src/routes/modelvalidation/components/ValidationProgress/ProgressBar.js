import React from 'react'
import PropTypes from 'prop-types'

import {StyledProgressBar, StyledInnerProgress, StyledProgressText} from './StyledProgressBar'

const getProgressText = state => {
  if (state.result) {
    return state.result
  }
  if (!state.running) {
    return 'Not started'
  }
  if (!state.total) {
    return 'Preparing...'
  }
  return `${getPercentage(state)}%`
}

const getPercentage = state => state.running && state.total
  ? Math.round(state.currentIndex / state.total * 100)
  : 0

const ProgressBar = ({state}) => (
  <StyledProgressBar>
    <StyledInnerProgress percentage={getPercentage(state)}/>
    <StyledProgressText>{getProgressText(state)}</StyledProgressText>
  </StyledProgressBar>
)

ProgressBar.propTypes = {
  state: PropTypes.shape({
    running: PropTypes.bool.isRequired,
    currentIndex: PropTypes.number,
    currentName: PropTypes.string,
    total: PropTypes.number
  }).isRequired
}

export default ProgressBar
