import styled, {css, keyframes} from 'styled-components'

import {
  colorizeBorder,
  colorizeText,
  declareFocus,
  declareFont,
  scale,
  theme
} from '../utilStyles'
import {StyledHtmlFormatter} from '../FormattedValue/typeFormatters/HtmlFormatter'

const borderWidth = '1.1px' // deliberately uneven to force correct rendering in chrome
const animationDuration = '200ms'

const getTextColor = ({isDisplay, secondaryPosition, immutable, signal, hasValue}) => {
  return signal
    ? 'signal'
    : hasValue
      ? 'hasValue'
      : isDisplay && secondaryPosition && immutable && !signal
        ? 'shade1'
        : isDisplay
          ? secondaryPosition
              ? 'shade0'
              : 'shade1'
          : secondaryPosition
            ? 'shade1'
            : immutable
              ? 'shade0'
              : signal
                ? 'signal'
                : 'shade1'
}

const getBorderColor = ({immutable, isDisplay, signal, isDirty}) => {
  return isDirty
    ? 'isDirty'
    : isDisplay || immutable
      ? 'transparent'
      : signal
        ? 'signal'
        : 'shade1'
}

const transformLabel = ({secondaryPosition}) => css`
  &&& {
    transition: color ${animationDuration},
      font-size ${animationDuration},
      font-weight ${animationDuration},
      margin ${animationDuration},
      top ${animationDuration};
    will-change: color, font-size, font-weight, margin, top;
    ${secondaryPosition && css`
      top: 0;
      font-size: ${scale.font(-0.8)};
      margin: calc(${scale.font(-0.5)} / -2) 0 0;
    `}
  }
`

const declareCursor = ({isDisplay, immutable}) => `cursor: ${(!isDisplay && immutable) ? 'not-allowed' : 'auto'};`

export const StyledLabelWrapper = styled.div`
  width: calc(100% - ${scale.space(0.5)});
`

const StyledStatedValueLabel = styled.label`
  &&& {
    ${declareFont({
      fontSize: scale.font(0),
      fontWeight: ({dirty}) => dirty ? theme.fontWeight('bold') : theme.fontWeight('regular'),
      lineHeight: 1
    })}
    background-color: ${theme.color('paper')};
    color: ${props => colorizeText[getTextColor(props)](props)};
    left: ${scale.space(-2)};
    margin: calc(${scale.font(0)} / -2) 0 0;
    padding: 1px ${scale.space(-2)}; // 1px to prevent label bottom from being cut
    position: absolute;
    top: 50%;
    width: ${({secondaryPosition}) => secondaryPosition ? 'auto' : 'inherit'};
    height: calc(${scale.font(0)} + 1px);
    overflow: hidden;
    ${props => transformLabel(props)}
    ${props => declareCursor(props)}
    pointer-events: ${({secondaryPosition}) => secondaryPosition ? 'auto' : 'none'};
    padding-left: ${({immutable}) => immutable && '0'};

    span {
      white-space: nowrap;
    }
  }
`

const StyledStatedValueBox = styled.div`
  &&& {
    border: ${borderWidth} solid ${props => colorizeBorder[getBorderColor(props)](props)};
    padding: ${scale.space(-1)} ${scale.space(-1)} ${scale.space(-2)}  ${scale.space(-1)};
    position: relative;
    ${props => !props.immutable && declareFocus(props)}
    ${props => declareCursor(props)}
    transition: border-color ${animationDuration};
    will-change: border-color;
    margin-top: ${({isDisplay}) => isDisplay && scale.space(-1)};
    padding-left: ${({immutable}) => immutable && scale.space(-2)};
    padding-top: ${({isDisplay, immutable}) => isDisplay && immutable && scale.space(-1)};

    * {
      padding-left: ${({isDisplay}) => isDisplay && '0'};
      margin-bottom: 0;
    }

    > ${StyledHtmlFormatter} {
      padding-top: ${({isDisplay}) => isDisplay && scale.space(-1)};
      position: relative;
      top: 5px;

      p:first-of-type {
        margin-top: 0;
      }
    }
  }
`

const StyledStatedValueDescription = styled.p`
  &&& {
    ${declareFont({
      fontSize: scale.font(-1)
    })}
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const StyledStatedValueError = styled.div`
  animation: ${fadeIn} 500ms ease-in-out both;
`

const StyledStatedValueWrapper = styled.div`
  &&& {
    margin-bottom: ${scale.space(-1)};
    padding-top: ${scale.space(-2)};

    ${/* sc-selector */StyledStatedValueBox},
    ${/* sc-selector */StyledStatedValueDescription},
    ${/* sc-selector */StyledStatedValueError} {
      margin-bottom: ${scale.space(-2)};

      &:last-child {
        margin-bottom: 0;
      }
    }

    ${/* sc-selector */StyledStatedValueDescription},
    ${/* sc-selector */StyledStatedValueError} {
      margin-left: calc(${scale.space(-1)} + ${borderWidth});
    }
  }
`

export {
  getTextColor,
  getBorderColor,
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueError,
  StyledStatedValueLabel,
  StyledStatedValueWrapper
}
