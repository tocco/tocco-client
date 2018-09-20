import styled, {keyframes} from 'styled-components'

import {
  declareFlatBaseColors,
  declareFlatPrimaryColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  stylingInk,
  stylingLook
} from '../utilStyles'

const declareIconColor = props => {
  let declareColor
  const {ink, look} = props
  const {FLAT, RAISED} = stylingLook
  const {BASE, PRIMARY} = stylingInk
  if (look === FLAT && ink === BASE) {
    declareColor = declareFlatBaseColors
  } else if (look === FLAT && ink === PRIMARY) {
    declareColor = declareFlatPrimaryColors
  } else if (look === RAISED && ink === BASE) {
    declareColor = declareRaisedBaseColors
  } else if (look === RAISED && ink === PRIMARY) {
    declareColor = declareRaisedPrimaryColors
  }
  return declareInteractionColors(declareColor(props), 'svg')
}

const rotateClockwise = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const stepClockwiseTopLeft = keyframes`
  0%, 100% {transform: translate(0, 0);}
  22%      {transform: translate(0, 0);}
  25%      {transform: translate(50px, 0);}
  47%      {transform: translate(50px, 0);}
  50%      {transform: translate(50px, 50px);}
  72%      {transform: translate(50px, 50px);}
  75%      {transform: translate(0, 50px);}
  97%      {transform: translate(0, 50px);}
`

const stepClockwiseTopRight = keyframes`
  0%, 100% {transform: translate(0, 0);}
  22%      {transform: translate(0, 0);}
  25%      {transform: translate(0, 50px);}
  47%      {transform: translate(0, 50px);}
  50%      {transform: translate(-50px, 50px);}
  72%      {transform: translate(-50px, 50px);}
  75%      {transform: translate(-50px, 0);}
  97%      {transform: translate(-50px, 0);}
`

const stepClockwiseBottomLeft = keyframes`
  0%, 100% {transform: translate(0, 0);}
  22%      {transform: translate(0, 0);}
  25%      {transform: translate(0, -50px);}
  47%      {transform: translate(0, -50px);}
  50%      {transform: translate(50px, -50px);}
  72%      {transform: translate(50px, -50px);}
  75%      {transform: translate(50px, 0);}
  97%      {transform: translate(50px, 0);}
`

const StyledIconToccoWrapper = styled.i`
  &&& {
    animation: ${rotateClockwise} 3s linear infinite;
    display: block;
    height: ${props => props.size ? props.size : ''};
    width: ${props => props.size ? props.size : '100%'};
    ${props => declareIconColor(props)}

    // if not Internet Explorer 11 or lower do sophisticated animation (https://bit.ly/2Okub3j)
    @supports not (old: ie) {
      animation: none;
      .tocco-icon-top-left {
        animation-name: ${stepClockwiseTopLeft};
      }

      .tocco-icon-top-right {
        animation-name: ${stepClockwiseTopRight};
      }

      .tocco-icon-bottom-left {
        animation-name: ${stepClockwiseBottomLeft};
      }
    }
  }
`

const animationDuration = 9
const StyledIconToccoSvg = styled.svg.attrs({
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 100 100'
})`
  &&& {
    fill: inherit;
    height: ${props => props.size ? props.size : ''};
    width: ${props => props.size ? props.size : '100%'};

    .tocco-icon-top-left,
    .tocco-icon-top-right,
    .tocco-icon-bottom-left {
      animation-duration: ${animationDuration}s;
      animation-iteration-count: infinite;
      fill: transparent;
      stroke-width: 14.4;
      stroke: inherit;
    }

    .tocco-icon-top-left {
      animation-delay: ${animationDuration / 12}s;
    }

    .tocco-icon-top-right {
      animation-delay: 0;
    }

    .tocco-icon-bottom-left {
      animation-delay: ${animationDuration / 6}s;
    }
  }
`

export {
  StyledIconToccoWrapper,
  StyledIconToccoSvg
}
