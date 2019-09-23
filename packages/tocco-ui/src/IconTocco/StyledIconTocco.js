import styled, {css, keyframes} from 'styled-components'

const rotateClockwise = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const stepClockwiseTopLeft = keyframes`
  0%, 100% {transform: translate(0, 0);}
  3%      {transform: translate(50px, 0);}
  25%      {transform: translate(50px, 0);}
  28%      {transform: translate(50px, 50px);}
  50%      {transform: translate(50px, 50px);}
  53%      {transform: translate(0, 50px);}
  75%      {transform: translate(0, 50px);}
  78%      {transform: translate(0, 0);}
`

const stepClockwiseTopRight = keyframes`
  0%, 100% {transform: translate(0, 0);}
  3%      {transform: translate(0, 50px);}
  25%      {transform: translate(0, 50px);}
  28%      {transform: translate(-50px, 50px);}
  50%      {transform: translate(-50px, 50px);}
  53%      {transform: translate(-50px, 0);}
  75%      {transform: translate(-50px, 0);}
  78%      {transform: translate(0, 0);}
`

const stepClockwiseBottomLeft = keyframes`
  0%, 100% {transform: translate(0, 0);}
  3%      {transform: translate(0, -50px);}
  25%      {transform: translate(0, -50px);}
  28%      {transform: translate(50px, -50px);}
  50%      {transform: translate(50px, -50px);}
  53%      {transform: translate(50px, 0);}
  75%      {transform: translate(50px, 0);}
  78%      {transform: translate(0, 0);}
`

const rotateClockwiseAnimation = css`
  ${rotateClockwise} 3s linear infinite;
`

const StyledIconToccoWrapper = styled.i`
  &&& {
    animation: ${rotateClockwiseAnimation};
    display: block;
    height: ${props => props.size ? props.size : ''};
    width: ${props => props.size ? props.size : '100%'};

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
    fill: transparent;
    height: ${props => props.size ? props.size : ''};
    width: ${props => props.size ? props.size : '100%'};

    .tocco-icon-top-left,
    .tocco-icon-top-right,
    .tocco-icon-bottom-left {
      animation-duration: ${animationDuration}s;
      animation-iteration-count: infinite;
      fill: transparent;
      stroke-width: 14.4;
      stroke: currentColor;
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
