import PropTypes from 'prop-types'
import React from 'react'

import {
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
} from './StyledMisc'
import {getTextOfChildren} from '../utilStyles'

const B = props =>
  <StyledB
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledB>

const Code = props =>
  <StyledCode
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledCode>

const Del = props =>
  <StyledDel
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledDel>

const Em = props =>
  <StyledEm
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledEm>

const Figcaption = props =>
  <StyledFigcaption
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledFigcaption>

const I = props =>
  <StyledI
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledI>

const Ins = props =>
  <StyledIns
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledIns>

const Kbd = props =>
  <StyledKbd
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledKbd>

const Label = props =>
  <StyledLabel
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
    htmlFor={props.for}
  >{props.children}</StyledLabel>

const Mark = props =>
  <StyledMark
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledMark>

const P = props =>
  <StyledP
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledP>

const Pre = props =>
  <StyledPre
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledPre>

const S = props =>
  <StyledS
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledS>

const Small = props =>
  <StyledSmall
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledSmall>

const Span = props =>
  <StyledSpan
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledSpan>

const Sub = props =>
  <StyledSub
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledSub>

const Sup = props =>
  <StyledSup
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledSup>

const Strong = props =>
  <StyledStrong
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledStrong>

const Time = props =>
  <StyledTime
    breakWords={props.breakWords}
    title={props.title}
    dateTime={props.dateTime}
  >{props.children}</StyledTime>

const U = props =>
  <StyledU
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledU>

const Var = props =>
  <StyledVar
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledVar>

const Q = props =>
  <StyledQ
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledQ>

B.defaultProps
  = Code.defaultProps
  = Del.defaultProps
  = Em.defaultProps
  = Figcaption.defaultProps
  = I.defaultProps
  = Ins.defaultProps
  = Kbd.defaultProps
  = Mark.defaultProps
  = P.defaultProps
  = Pre.defaultProps
  = Q.defaultProps
  = S.defaultProps
  = Small.defaultProps
  = Span.defaultProps
  = Strong.defaultProps
  = Sub.defaultProps
  = Sup.defaultProps
  = U.defaultProps
  = Var.defaultProps
  = {breakWords: true}

Time.defaultProps = {
  breakWords: false
}

const propTypes = {
  /**
   * If true words break with hyphens.
   * If false text is forced into a single truncated line.
   */
  breakWords: PropTypes.bool,
  children: PropTypes.node
}

B.propTypes
  = Code.propTypes
  = Del.propTypes
  = Em.propTypes
  = Figcaption.propTypes
  = I.propTypes
  = Ins.propTypes
  = Kbd.propTypes
  = Label.propTypes
  = Mark.propTypes
  = P.propTypes
  = Pre.propTypes
  = Q.propTypes
  = S.propTypes
  = Small.propTypes
  = Span.propTypes
  = Strong.propTypes
  = Sub.propTypes
  = Sup.propTypes
  = U.propTypes
  = Var.propTypes
  = propTypes

Time.propTypes = {
/**
* If true words break with hyphens.
* If false text is forced into a single truncated line.
*/
  breakWords: PropTypes.bool,
  children: PropTypes.node,
  dateTime: PropTypes.string.isRequired,
  title: PropTypes.string
}

export {
  B,
  Code,
  Del,
  Em,
  Figcaption,
  I,
  Ins,
  Kbd,
  Label,
  Mark,
  P,
  Pre,
  Q,
  S,
  Small,
  Span,
  Strong,
  Sub,
  Sup,
  Time,
  U,
  Var
}
