import styled from 'styled-components'

import {scale} from '../utilStyles'
import StyledPanel from './StyledPanel'

const StyledPanelGroup = styled.div`
  && {
    ${StyledPanel}:not(:last-child) {
      margin-bottom: ${scale.space(-1)};
    }
  }
`

export default StyledPanelGroup
