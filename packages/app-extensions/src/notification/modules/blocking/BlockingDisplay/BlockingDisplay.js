import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import ReactDOM from 'react-dom'

import Content from '../../../components/Content'
import {blockerPropTypes} from '../blocking'
import {StyledPageOverlay, StyledBlockingDisplay, StyledTitleWrapper} from './StyledComponents'

const BlockingDisplay = ({blockers}) => {
  if (!blockers || blockers.length === 0) {
    return null
  }

  const firstBlocker = blockers[0]
  return <>
    {ReactDOM.createPortal(
      <StyledPageOverlay>
        <StyledBlockingDisplay>
          {firstBlocker.title && <Typography.H1>
            <StyledTitleWrapper><Content>{firstBlocker.title}</Content></StyledTitleWrapper>
          </Typography.H1>
          }
          {firstBlocker.body && <Typography.Span><Content>{firstBlocker.body}</Content></Typography.Span>}
        </StyledBlockingDisplay>
      </StyledPageOverlay>, document.body)}
  </>
}

BlockingDisplay.propTypes = {
  blockers: PropTypes.arrayOf(blockerPropTypes)
}

export default BlockingDisplay
