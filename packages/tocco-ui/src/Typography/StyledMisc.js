import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  scale,
  theme,
  shadeColor
} from '../utilStyles'

const StyledB = styled.b`
  && {
    ${declareFont({
    fontWeight: theme.fontWeight('bold')
  })}
  }
  ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
`

const StyledCode = styled.code`
  && {
    ${declareFont({
    fontFamily: theme.fontFamily('monospace'),
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${theme.radii('regular')};
    padding: ${scale.space(-4)} ${scale.space(-2)};
  }
`

const StyledDel = styled.del`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: line-through;
  }
`

const StyledEm = styled.em`
  && {
    ${declareFont({
    fontStyle: 'italic'
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledFigcaption = styled.figcaption`
  && {
    ${declareFont({
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: ${scale.space(-2)} 0 ${scale.space(-1)} 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
const StyledI = styled.i`
  && {
    ${declareFont({
    fontStyle: 'italic'
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledIns = styled.ins`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: underline;
  }
`

const StyledKbd = styled.kbd`
  && {
    ${declareFont({
    fontFamily: theme.fontFamily('monospace'),
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    border-radius: ${theme.radii('regular')};
    padding: ${scale.space(-4)} ${scale.space(-2)};
    vertical-align: text-top;
  }
`
const StyledLabel = styled.label`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: 0 0 ${scale.space(-1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledMark = styled.mark`
  && {
    ${declareFont({
    fontFamily: theme.fontFamily('monospace')
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme.color('signal.info.paper')};
    border-radius: ${theme.radii('regular')};
    padding: ${scale.space(-4)} ${scale.space(-2)};
  }
`

const StyledP = styled.p`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: 0 0 ${scale.space(-1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledPre = styled.pre`
  && {
    ${declareFont({
    fontFamily: theme.fontFamily('monospace'),
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${theme.radii('regular')};
    border: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    display: block;
    margin: 0 0 ${scale.space(-1)};
    padding: ${scale.space(-3)} ${scale.space(-2)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledS = styled.s`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: line-through;
  }
`

const StyledSmall = styled.small`
  && {
    ${declareFont()}
    font-size: calc(1em / ${theme.fontSize('factor')});
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledSpan = styled.span`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledSub = styled.sub`
  && {
    ${declareFont({
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    line-height: 0;
    position: relative;
    bottom: -.25em;
    vertical-align: baseline;
  }
`

const StyledSup = styled.sup`
  && {
    ${declareFont({
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    line-height: 0;
    position: relative;
    top: -.5em;
    vertical-align: baseline;
  }
`

const StyledStrong = styled.strong`
  && {
    ${declareFont({
    fontWeight: theme.fontWeight('bold')
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledTime = styled.time`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledU = styled.u`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: underline;
  }
`

const StyledVar = styled.var`
  && {
    ${declareFont({
    fontFamily: theme.fontFamily('monospace'),
    fontSize: scale.font(-1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}

    &:after {
      content: ']';
    }

    &:before {
      content: '[';
    }
  }
`

const StyledQ = styled.q`
  && {
    ${declareFont()}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}

    &:after {
      content: close-quote;
    }

    &:before {
      content: open-quote;
    }
  }
`

export {
  StyledB,
  StyledCode,
  StyledDel,
  StyledEm,
  StyledFigcaption,
  StyledI,
  StyledIns,
  StyledKbd,
  StyledLabel,
  StyledMark,
  StyledP,
  StyledPre,
  StyledQ,
  StyledS,
  StyledSmall,
  StyledSpan,
  StyledStrong,
  StyledSub,
  StyledSup,
  StyledTime,
  StyledU,
  StyledVar
}
