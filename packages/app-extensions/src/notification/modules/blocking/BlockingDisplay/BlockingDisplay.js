import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import Content from '../../../components/Content'
import {blockerPropTypes} from '../blocking'
import {StyledPageOverlay, StyledBlockingDisplay} from './StyledComponents'

const BlockingDisplay = ({blockers}) => {
  if (!blockers || blockers.length === 0) {
    return null
  }

  const firstBlocker = blockers[0]
  return (
    <StyledPageOverlay>
      <StyledBlockingDisplay>
        {firstBlocker.title && <Typography.H1><Content>{firstBlocker.title}</Content></Typography.H1>}
        {firstBlocker.body && <Typography.Span><Content>{firstBlocker.body}</Content></Typography.Span>}
      </StyledBlockingDisplay>
    </StyledPageOverlay>
  )
}

BlockingDisplay.propTypes = {
  blockers: PropTypes.arrayOf(blockerPropTypes)
}

export default BlockingDisplay
