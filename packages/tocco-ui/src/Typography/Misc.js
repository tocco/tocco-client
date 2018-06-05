import PropTypes from 'prop-types'
import React from 'react'

import {
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
  StyledVar
} from './StyledMisc'

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
  Sub,
  Sup,
  U,
  Var
}
