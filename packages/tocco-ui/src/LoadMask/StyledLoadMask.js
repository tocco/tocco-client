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
  // Safari 10.1+ https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
  @media not all and (min-resolution: .01dpcm) {
    @media {
      transform: translateZ(0);
    }
  }
`

export default StyledLoadMask
