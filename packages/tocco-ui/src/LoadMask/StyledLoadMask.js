import styled, {css} from 'styled-components'
import {theme} from 'styled-system'

import {StyledSpan} from '../Typography/StyledTypography'

const StyledLoadMask = styled.div`
  ${props => !props.isInitialized && css`
    && {
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      justify-content: center;
      padding: ${theme('space.4')}
      width: 100%;

      > ${StyledSpan} {
        text-align: center;
      }

      > svg {
        font-size: ${theme('fontSizes.5')};
        margin: 0 auto ${theme('space.4')} auto !important;
      }
    }
  `}
`

export default StyledLoadMask
