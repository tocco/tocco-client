import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Typography, theme} from 'tocco-ui'

import Content from '../../../components/Content'
import {blockerPropTypes} from '../blocking'

const StyledBlockingDisplay = styled.div`
  z-index: 99999999999999999;
  position: absolute;
  margin: auto;
  width: 50%;
  padding: 10px;
  background-color: ${theme.color('paper')};
`

const BlockingDisplay = ({blockers}) => {
  if (!blockers || blockers.length === 0) {
    return null
  }
    
  const firstBlocker = blockers[0]
  return (
    <StyledBlockingDisplay>
      {firstBlocker.title && <Typography.H1><Content>{firstBlocker.title}</Content></Typography.H1>}
      {firstBlocker.body && <Content>{firstBlocker.body}</Content>}
    </StyledBlockingDisplay>
  )
}

BlockingDisplay.propTypes = {
  blockers: PropTypes.arrayOf(blockerPropTypes)
}

export default BlockingDisplay
