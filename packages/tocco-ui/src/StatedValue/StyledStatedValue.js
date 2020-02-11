import styled, {css} from 'styled-components'

import {
  colorizeBorder,
  colorizeText,
  declareFocus,
  declareFont,
  scale,
  theme as getTheme
} from '../utilStyles'
import {StyledHtmlFormatter} from '../FormattedValue/typeFormatters/HtmlFormatter'

const BORDER_WIDTH = '1px'
const ANIMATION_DURATION = '200ms'

const getTextColor = ({immutable, isDisplay, secondaryPosition, signal}) => {
  return isDisplay
    ? secondaryPosition
      ? 'shade0'
      : 'shade1'
    : immutable
      ? secondaryPosition
        ? 'shade1'
        : 'shade2'
      : signal
        ? 'signal'
        : secondaryPosition
          ? 'shade0'
          : 'shade1'
}

const getBorderColor = ({immutable, isDisplay, secondaryPosition, signal}) => {
  return isDisplay
    ? 'transparent'
    : immutable
      ? 'shade1'
      : signal
        ? 'signal'
        : 'shade2'
}

const transformLabel = ({secondaryPosition, theme}) => css`
  &&& {
    transition: color ${ANIMATION_DURATION},
                font-size ${ANIMATION_DURATION},
                font-weight ${ANIMATION_DURATION},
                margin ${ANIMATION_DURATION},
                top ${ANIMATION_DURATION};
    will-change: color, font-size, font-weight, margin, top;

    ${secondaryPosition && css`
      top: 0%;
      font-size: ${scale.font(-1)};
      font-weight: ${getTheme.fontWeight('bold')};
      margin: calc(${scale.font(-1)} / -2) 0 0;
    `}
`

const declareCursor = ({isDisplay, immutable}) => `cursor: ${(!isDisplay && immutable) ? 'not-allowed' : 'auto'};`

const StyledStatedValueLabel = styled.label`
  &&& {
    ${props => declareFont({
    fontSize: scale.font(0),
    fontWeight: getTheme.fontWeight('regular'),
    lineHeight: 1
  })}
    background-color: ${getTheme.color('paper')};
    color: ${props => colorizeText[getTextColor(props)](props)};
    left: ${scale.space(-2)};
    margin: calc(${scale.font(0)} / -2) 0 0;
    padding: 0 ${scale.space(-2)};
    position: absolute;
    top: 50%;
    ${props => transformLabel(props)}
    ${props => declareCursor(props)}
    pointer-events: ${props => props.secondaryPosition ? 'auto' : 'none'}
  }
`

const StyledStatedValueBox = styled.div`
  &&& {
    border: ${BORDER_WIDTH} solid ${props => colorizeBorder[getBorderColor(props)](props)};
    padding: ${scale.space(-2)} ${scale.space(-1)};
    position: relative;
    ${props => !props.immutable && declareFocus(props)}
    ${props => declareCursor(props)}
    transition: border-color ${ANIMATION_DURATION};
    will-change: border-color;

    > ${StyledHtmlFormatter} {
      margin-bottom: 0;
    }
  }
`

const StyledStatedValueDescription = styled.p`
  &&& {
    ${declareFont()}
    font-size: ${scale.font(-1)};
  }
`

const StyledStatedValueError = styled.div`
  &&& {
    max-height: 0px;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    transition-delay: 0.5s;
    will-change: max-height, opacity;

    ${props => props.showError && css`
      max-height: 100px;
      opacity: 1;
    `};

    li {
      font-size: ${scale.font(-1)};
    }
  }
`

const StyledStatedValueWrapper = styled.div`
  &&& {
    margin-bottom: ${scale.space(-1)};

    ${StyledStatedValueBox},
    ${StyledStatedValueDescription},
    ${StyledStatedValueError} {
      margin-bottom: ${scale.space(-2)};

      &:last-child {
        margin-bottom: 0;
      }
    }

    ${StyledStatedValueDescription},
    ${StyledStatedValueError} {
      margin-left: calc(${scale.space(-1)} + ${BORDER_WIDTH});
    }

    padding-top: ${scale.space(-2)};
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
