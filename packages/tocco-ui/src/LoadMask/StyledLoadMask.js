import styled, {css, keyframes} from 'styled-components'
import {theme} from 'styled-system'

import {scale} from '../utilStyles'
import {StyledSpan} from '../Typography/StyledMisc'
import {StyledIconToccoWrapper} from '../IconTocco'

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`

const fadeInAnimation = css`
  ${fadeIn} 400ms ease-in-out both;
`

const StyledLoadMask = styled.div`
  ${props => !props.isInitialized && css`
    && {
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: ${props => scale.space(props, -1)};
      width: 100%;
      animation: ${fadeInAnimation};

      > ${StyledSpan} {
        margin-top: ${props => scale.space(props, -1)};
        z-index: 1;
      }

      > ${StyledIconToccoWrapper} {
        color: ${theme('colors.primary')};
      }
    }
  `}
`

export default StyledLoadMask
