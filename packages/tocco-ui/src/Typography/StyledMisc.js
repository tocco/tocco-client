import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText
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
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme('colors.base.fill.0')};
    border-radius: ${theme('radii.1')};
    padding: ${theme('space.1')} ${theme('space.3')};
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
    fontSize: theme('fontSizes.1')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: ${theme('space.4')} 0;

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
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme('colors.base.line.0')};
    border-radius: ${theme('radii.1')};
    color: ${theme('colors.base.paper')};
    padding: ${theme('space.1')} ${theme('space.3')};
  }
`

const StyledMark = styled.mark`
  && {
    ${props => declareFont(props, {
    fontFamily: '"Roboto Mono", monospace'
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme('colors.signal.infoBg')};
    border-radius: ${theme('radii.1')};
    padding: ${theme('space.1')} ${theme('space.3')};
  }
`

const StyledP = styled.p`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin-bottom: ${theme('space.5')};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledPre = styled.pre`
  && {
    ${props => declareFont(props, {
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    background-color: ${theme('colors.base.fill.0')};
    border-radius: ${theme('radii.1')};
    border: 1px solid ${theme('colors.base.fill.1')};
    display: block;
    margin: 0 0 ${theme('space.5')};
    padding: ${theme('space.4')};

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
    fontSize: theme('fontSizes.1')(props)
  })}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledSub = styled.sub`
  && {
    ${props => declareFont(props, {
    fontSize: theme('fontSizes.1')(props)
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
    fontSize: theme('fontSizes.1')(props)
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
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
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
  StyledStrong,
  StyledSub,
  StyledSup,
  StyledTime,
  StyledU,
  StyledVar
}
