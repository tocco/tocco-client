import styled, {css} from 'styled-components'
import {theme} from 'styled-system'

import {StyledSpan} from '../Typography/StyledMisc'

const StyledLoadMask = styled.div`
  ${props => !props.isInitialized && css`
    && {
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: ${theme('space.4')}
      width: 100%;

      > ${StyledSpan} {
        margin-top: ${theme('space.4')}
        z-index: 1;
      }
    }
  `}
`

export default StyledLoadMask
