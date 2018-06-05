import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const StyledB = styled.b`
  && {
    ${props => declareFont(props, {
    fontWeight: 700
  })}
  }
`

const StyledCode = styled.code`
  && {
    ${props => declareFont(props, {
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    background-color: ${props => theme('colors.base.fill.0')};
    border-radius: ${props => theme('radii.1')};
    padding: ${props => theme('space.1')} ${props => theme('space.3')};
  }
`

const StyledDel = styled.del`
  && {
    ${props => declareFont(props)}
    text-decoration: line-through;
  }
`

const StyledEm = styled.em`
  && {
    ${props => declareFont(props, {
    fontStyle: 'italic'
  })}
  }
`

const StyledI = styled.i`
  && {
    ${props => declareFont(props, {
    fontStyle: 'italic'
  })}
  }
`

const StyledIns = styled.ins`
  && {
    ${props => declareFont(props)}
    text-decoration: underline;
  }
`

const StyledKbd = styled.kbd`
  && {
    ${props => declareFont(props, {
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    background-color: ${props => theme('colors.base.line.0')};
    border-radius: ${props => theme('radii.1')};
    color: ${props => theme('colors.base.paper')};
    padding: ${props => theme('space.1')} ${props => theme('space.3')};
  }
`

const StyledMark = styled.mark`
  && {
    ${props => declareFont(props, {
    fontFamily: '"Roboto Mono", monospace'
  })}
    background-color: ${props => theme('colors.signal.infoBg')};
    border-radius: ${props => theme('radii.1')};
    padding: ${props => theme('space.1')} ${props => theme('space.3')};
  }
`

const StyledP = styled.p`
  && {
    ${props => declareFont(props)}
    margin-bottom: theme('space.5')(props)
  }
`

const StyledPre = styled.pre`
  && {
    ${props => declareFont(props, {
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    background-color: ${props => theme('colors.base.fill.0')};
    border-radius: ${props => theme('radii.1')};
    border: 1px solid ${props => theme('colors.base.fill.1')};
    display: block;
    margin: 0 0 ${props => theme('space.5')};
    padding: ${props => theme('space.4')};
  }
`

const StyledS = styled.s`
  && {
    ${props => declareFont(props)}
    text-decoration: line-through;
  }
`

const StyledSub = styled.sub`
  && {
    ${props => declareFont(props, {
    fontSize: theme('fontSizes.1')(props)
  })}
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
  }
`

const StyledU = styled.u`
  && {
    ${props => declareFont(props)}
    text-decoration: underline;
  }
`

const StyledQ = styled.q`
  && {
    ${props => declareFont(props)}
    &:after {
      content: close-quote;
    }
    &:before {
      content: open-quote;
    }
  }
`

const StyledVar = styled.var`
  && {
    ${props => declareFont(props, {
    fontFamily: theme('fontFamily.monospace')(props),
    fontSize: theme('fontSizes.1')(props)
  })}
    &:after {
      content: ']';
    }
    &:before {
      content: '[';
    }
  }
`

const B = props => {
  return (
    <StyledB>{props.children}</StyledB>
  )
}

const Code = props => {
  return (
    <StyledCode>{props.children}</StyledCode>
  )
}

const Del = props => {
  return (
    <StyledDel>{props.children}</StyledDel>
  )
}

const Em = props => {
  return (
    <StyledEm>{props.children}</StyledEm>
  )
}

const I = props => {
  return (
    <StyledI>{props.children}</StyledI>
  )
}

const Ins = props => {
  return (
    <StyledIns>{props.children}</StyledIns>
  )
}

const Kbd = props => {
  return (
    <StyledKbd>{props.children}</StyledKbd>
  )
}

const Mark = props => {
  return (
    <StyledMark>{props.children}</StyledMark>
  )
}

const P = props => {
  return (
    <StyledP>{props.children}</StyledP>
  )
}

const Pre = props => {
  return (
    <StyledPre>{props.children}</StyledPre>
  )
}

const S = props => {
  return (
    <StyledS>{props.children}</StyledS>
  )
}

const Strong = props => {
  return (
    <StyledStrong>{props.children}</StyledStrong>
  )
}

const Sub = props => {
  return (
    <StyledSub>{props.children}</StyledSub>
  )
}

const Sup = props => {
  return (
    <StyledSup>{props.children}</StyledSup>
  )
}

const U = props => {
  return (
    <StyledU>{props.children}</StyledU>
  )
}

const Var = props => {
  return (
    <StyledVar>{props.children}</StyledVar>
  )
}

const Q = props => {
  return (
    <StyledQ>{props.children}</StyledQ>
  )
}

B.propTypes
= Code.propTypes
= Del.propTypes
= Em.propTypes
= I.propTypes
= Ins.propTypes
= Kbd.propTypes
= Mark.propTypes
= P.propTypes
= Pre.propTypes
= Q.propTypes
= S.propTypes
= Strong.propTypes
= Sub.propTypes
= Sup.propTypes
= U.propTypes
= Var.propTypes = {
                                  children: PropTypes.node.isRequired
                                }

export {
  B,
  Code,
  Del,
  Em,
  I,
  Ins,
  Kbd,
  Mark,
  P,
  Pre,
  Q,
  S,
  Strong,
  StyledB,
  StyledCode,
  StyledDel,
  StyledEm,
  StyledI,
  StyledIns,
  StyledKbd,
  StyledMark,
  StyledP,
  StyledPre,
  StyledQ,
  StyledS,
  StyledStrong,
  StyledSub,
  StyledSup,
  StyledU,
  StyledVar,
  Sub,
  Sup,
  U,
  Var
}
