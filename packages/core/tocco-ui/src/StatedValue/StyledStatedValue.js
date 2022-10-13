import styled from 'styled-components'

import {StyledHtmlFormatter} from '../FormattedValue/formatters/HtmlFormatter'
import {StyledUl} from '../Typography'
import {colorizeBorder, colorizeText, declareFocus, declareFont, scale, theme} from '../utilStyles'

const borderWidth = '1.1px' // deliberately uneven to force correct rendering in chrome

export const getTextColor = ({isDisplay, immutable, signal, hasValue}) => {
  if (signal) {
    return 'signal'
  }
  if (hasValue) {
    return 'hasValue'
  }
  if (isDisplay) {
    return 'shade1'
  }
  if (immutable) {
    return 'shade0'
  }

  return 'shade1'
}

export const getBorderColor = ({immutable, isDisplay, signal, isDirty}) => {
  if (isDirty) {
    return 'isDirty'
  }
  if (isDisplay || immutable) {
    return 'transparent'
  }
  if (signal) {
    return 'signal'
  }

  return 'shade1'
}

const declareCursor = ({isDisplay, immutable}) => `cursor: ${!isDisplay && immutable ? 'not-allowed' : 'auto'};`

export const StyledLabelWrapper = styled.div`
  width: calc(100% - ${scale.space(0.5)});
`

export const StyledStatedValueLabel = styled.label`
  &&& {
    ${declareFont({
      fontWeight: ({dirty}) => (dirty ? theme.fontWeight('bold') : theme.fontWeight('regular')),
      lineHeight: theme.lineHeight('dense')
    })}
    background-color: ${theme.color('paper')};
    color: ${props => colorizeText[getTextColor(props)](props)};
    left: ${scale.space(-2)};
    margin: calc(${scale.font(0)} / -2) 0 0;
    padding: 0 ${scale.space(-2)} 0 ${({immutable}) => immutable && '0'}; // if immutable remove left padding
    position: absolute;
    width: auto;
    height: calc(${scale.font(0)} + 1px);
    overflow: hidden;
    top: 0;
    pointer-events: auto;
    ${props => declareCursor(props)}

    span {
      white-space: nowrap;
    }
  }
`

export const StyledStatedValueBox = styled.div`
  &&& {
    border: ${borderWidth} solid ${props => colorizeBorder[getBorderColor(props)](props)};
    padding: ${scale.space(-1)} ${scale.space(-1)} ${scale.space(-2)} ${scale.space(-1)};
    position: relative;
    margin-top: ${({isDisplay}) => isDisplay && scale.space(-1)};
    padding-left: ${({immutable}) => immutable && scale.space(-2)};
    padding-top: ${({isDisplay, immutable}) => isDisplay && immutable && scale.space(-1)};
    ${props => !props.immutable && declareFocus(props)}
    ${props => declareCursor(props)}

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

export const StyledStatedValueDescription = styled.p`
  &&& {
    ${declareFont({
      fontSize: scale.font(-1)
    })}
  }
`

export const StyledStatedValueError = styled.div``

export const StyledStatedValueWrapper = styled.div`
  &&& {
    margin-bottom: ${scale.space(-1)};
    padding-top: ${scale.space(-1.5)};

    ${/* sc-selector */ StyledStatedValueBox},
    ${/* sc-selector */ StyledStatedValueDescription},
    ${/* sc-selector */ StyledStatedValueError} {
      margin-bottom: ${scale.space(-2)};

      &:last-child {
        margin-bottom: 0;
      }
    }

    ${/* sc-selector */ StyledStatedValueDescription},
    ${/* sc-selector */ StyledStatedValueError} {
      margin-left: calc(${scale.space(-1)} + ${borderWidth});

      ${StyledUl} {
        margin-left: -${scale.space(-2)};
      }
    }
  }
`

export const StyledInput = styled.input`
  border: 0;
  cursor: ${({args}) => (args.immutable && !args.isDisplay ? 'not-allowed' : 'auto')};
  color: ${({args}) => (args.immutable && !args.isDisplay ? '#545454' : '#000')};
  outline: 0;
  transition: color 200ms;
  width: 100%;
`
