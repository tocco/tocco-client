import styled, {css} from 'styled-components'
import _get from 'lodash/get'

import {
  declareFocus,
  declareFont,
  scale,
  shadeColor,
  theme as getTheme
} from '../utilStyles'

const BORDER_WIDTH = '1px'
const ANIMATION_DURATION = '200ms'

const getTextColor = ({theme, signal}) =>
  signal
    ? getTheme.color(`signal.${signal}.text`)({theme})
    : getTheme.color('text')({theme})

const getBorderColor = ({theme, signal}) =>
  signal
    ? getTheme.color(`signal.${signal}.text`)({theme})
    : shadeColor(_get(theme, 'colors.paper'), 2)

const transformLabel = ({secondaryPosition, theme}) => css`
  &&& {
    transition: top ${ANIMATION_DURATION},
                font-size ${ANIMATION_DURATION},
                font-weight ${ANIMATION_DURATION};
    will-change: top, font-size, font-weight;

    ${secondaryPosition && css`
      top: 0%;
      font-size: ${scale.font(-1)};
      font-weight: ${getTheme.fontWeight('bold')};
    `}
`

const retainSpace = ({secondaryPosition, theme}) => css`
  transition: padding-top ${ANIMATION_DURATION};
  will-change: padding-top;
  padding-top: ${secondaryPosition ? css`calc(${scale.font(-1)} / 2 )` : 0};
`

const StyledStatedValueLabel = styled.label`
  &&& {
    ${declareFont({
    fontSize: scale.font(0),
    fontWeight: getTheme.fontWeight('regular'),
    lineHeight: 1
  })}
    background-color: ${getTheme.color('paper')};
    color: ${props => getTextColor(props)};
    left: ${scale.space(-2)};
    margin-top: calc(${scale.font(-1)} / -2);
    padding: 0 ${scale.space(-2)};
    position: absolute;
    top: 50%;
    ${props => transformLabel(props)}
  }
`

const StyledStatedValueBox = styled.div`
  &&& {
    border-radius: ${getTheme.radii('regular')};
    border: ${BORDER_WIDTH} solid ${props => getBorderColor(props)};
    padding: ${scale.space(-2)} ${scale.space(-1)};
    position: relative;
    ${props => declareFocus(props)}
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

    ${props => retainSpace(props)}
  }
`

export {
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueError,
  StyledStatedValueLabel,
  StyledStatedValueWrapper
}
