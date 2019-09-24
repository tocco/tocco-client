import styled, {css, keyframes} from 'styled-components'

import {
  scale
} from '../utilStyles'
import {StyledSpan} from '../Typography/StyledMisc'

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
      padding: ${scale.space(-1)};
      width: 100%;
      animation: ${fadeInAnimation};

      > ${StyledSpan} {
        margin-top: ${scale.space(-1)};
        z-index: 1;
      }
    }
  `}
`

export default StyledLoadMask
