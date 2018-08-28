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

const getTextColor = ({theme, signal}) =>
  signal
    ? getTheme.color(`signal.${signal}.text`)({theme})
    : getTheme.color('text')({theme})

const getBorderColor = ({theme, signal}) =>
  signal
    ? getTheme.color(`signal.${signal}.text`)({theme})
    : shadeColor(_get(theme, 'colors.paper'), 2)

const moveLabel = () => css`
  top: 0%;
  font-size: ${scale.font(-1)};
  font-weight: ${getTheme.fontWeight('bold')};
`

const retainSpace = () => css`
  padding-top: calc(${scale.font(-1)} / 2 );
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
    ${props => props.hasValue && moveLabel()}
  }
`

const StyledStatedValueBox = styled.div`
  &&& {
    border-radius: ${getTheme.radii('regular')};
    border: ${BORDER_WIDTH} solid ${props => getBorderColor(props)};
    padding: ${scale.space(-2)} ${scale.space(-1)};
    position: relative;
    ${props => declareFocus(props)}

    &:focus-within ${StyledStatedValueLabel} {
      ${props => moveLabel()}
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
    li {
      font-size: ${scale.font(-1)};
    }
  }
`

const StyledStatedValueWrapper = styled.div`
  &&& {
    margin-bottom: ${scale.space(-1)};

    ${props => props.hasValue && retainSpace()}
    &:focus-within {
      ${retainSpace()}
    }

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
  }
`

export {
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueError,
  StyledStatedValueLabel,
  StyledStatedValueWrapper
}
