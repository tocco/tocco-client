import styled, {css, keyframes} from 'styled-components'
import {theme} from 'styled-system'

import {StyledSpan} from '../Typography/StyledMisc'
import {StyledIconToccoWrapper} from '../IconTocco'

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`

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
      animation: ${fadeIn} 400ms ease-in-out both;

      > ${StyledSpan} {
        margin-top: ${theme('space.4')}
        z-index: 1;
      }

      > ${StyledIconToccoWrapper} {
        color: ${theme('colors.primary.line.0')};
      }
    }
  `}
`

export default StyledLoadMask
