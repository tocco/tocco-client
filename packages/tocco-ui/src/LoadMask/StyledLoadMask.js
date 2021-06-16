import styled, {css, keyframes} from 'styled-components'

import {
  scale
} from '../utilStyles'
import {StyledSpan} from '../Typography/StyledMisc'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const fadeInAnimation = css`
  animation: ${fadeIn} 400ms ease-in-out both;
`

export const StyledLoadingIconAndTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${scale.space(-1)};
  ${fadeInAnimation};

  > ${StyledSpan} {
    margin-top: ${scale.space(-1)};
    z-index: 1;
  }
`

const StyledLoadMask = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  z-index: 0; // prevent interference with StyledPageOverlay when implemented as widget
`

export default StyledLoadMask
