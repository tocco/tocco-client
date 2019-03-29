import styled from 'styled-components'
import _get from 'lodash/get'
import _round from 'lodash/round'

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
    ${props => declareFont(props, {
    fontWeight: 700
  })}
  }
  ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
`

const StyledCode = styled.code`
  && {
    ${props => declareFont(props, {
    fontFamily: theme.fontFamily('monospace')(props),
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${theme.radii('regular')};
    padding: ${props => scale.space(props.theme, -4)} ${props => scale.space(props.theme, -2)};
  }
`

const StyledDel = styled.del`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: line-through;
  }
`

const StyledEm = styled.em`
  && {
    ${props => declareFont(props, {
    fontStyle: 'italic'
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledFigcaption = styled.figcaption`
  && {
    ${props => declareFont(props, {
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: ${props => scale.space(props.theme, -1)} 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
const StyledI = styled.i`
  && {
    ${props => declareFont(props, {
    fontStyle: 'italic'
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledIns = styled.ins`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: underline;
  }
`

const StyledKbd = styled.kbd`
  && {
    ${props => declareFont(props, {
    fontFamily: theme.fontFamily('monospace')(props),
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    border-radius: ${theme.radii('regular')};
    padding: ${props => scale.space(props.theme, -4)} ${props => scale.space(props.theme, -2)};
    vertical-align: text-top;
  }
`

const StyledMark = styled.mark`
  && {
    ${props => declareFont(props, {
    fontFamily: theme.fontFamily('monospace')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme.color('signal.info.paper')};
    border-radius: ${theme.radii('regular')};
    padding: ${props => scale.space(props.theme, -4)} ${props => scale.space(props.theme, -2)};
  }
`

const StyledP = styled.p`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin-bottom: ${props => scale.space(props.theme, -1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledPre = styled.pre`
  && {
    ${props => declareFont(props, {
    fontFamily: theme.fontFamily('monospace')(props),
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${theme.radii('regular')};
    border: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    display: block;
    margin: 0 0 ${props => scale.space(props.theme, -1)};
    padding: ${props => scale.space(props.theme, -3)} ${props => scale.space(props.theme, -2)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledS = styled.s`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: line-through;
  }
`

const StyledSmall = styled.small`
  && {
    ${props => declareFont(props, {
    fontSize: `${_round(1 / theme.fontSize('factor')(props), 3)}em`
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledSpan = styled.span`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledSub = styled.sub`
  && {
    ${props => declareFont(props, {
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    line-height: 0;
    position: relative;
    bottom: -0.25em
    vertical-align: baseline;
  }
`

const StyledSup = styled.sup`
  && {
    ${props => declareFont(props, {
    fontSize: scale.font(props.theme, -1)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    line-height: 0;
    position: relative;
    top: -0.5em
    vertical-align: baseline;
  }
`

const StyledStrong = styled.strong`
  && {
    ${props => declareFont(props, {
    fontWeight: 700
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledTime = styled.time`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledU = styled.u`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    text-decoration: underline;
  }
`

const StyledVar = styled.var`
  && {
    ${props => declareFont(props, {
    fontFamily: theme.fontFamily('monospace')(props),
    fontSize: scale.font(props.theme, -1)
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
    ${props => declareFont(props)}
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
