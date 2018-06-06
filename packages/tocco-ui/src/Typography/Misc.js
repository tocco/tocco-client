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
import {getTextOfChildren} from '../utilStyles'

const B = props => {
  return (
    <StyledB
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledB>
  )
}

const Code = props => {
  return (
    <StyledCode
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledCode>
  )
}

const Del = props => {
  return (
    <StyledDel
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledDel>
  )
}

const Em = props => {
  return (
    <StyledEm
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledEm>
  )
}

const I = props => {
  return (
    <StyledI
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledI>
  )
}

const Ins = props => {
  return (
    <StyledIns
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledIns>
  )
}

const Kbd = props => {
  return (
    <StyledKbd
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledKbd>
  )
}

const Mark = props => {
  return (
    <StyledMark
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledMark>
  )
}

const P = props => {
  return (
    <StyledP
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledP>
  )
}

const Pre = props => {
  return (
    <StyledPre
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledPre>
  )
}

const S = props => {
  return (
    <StyledS
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledS>
  )
}

const Sub = props => {
  return (
    <StyledSub
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledSub>
  )
}

const Sup = props => {
  return (
    <StyledSup
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledSup>
  )
}

const Strong = props => {
  return (
    <StyledStrong
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledStrong>
  )
}

const U = props => {
  return (
    <StyledU
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledU>
  )
}

const Var = props => {
  return (
    <StyledVar
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledVar>
  )
}

const Q = props => {
  return (
    <StyledQ
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledQ>
  )
}

B.defaultProps
= Code.defaultProps
= Del.defaultProps
= Em.defaultProps
= I.defaultProps
= Ins.defaultProps
= Kbd.defaultProps
= Mark.defaultProps
= P.defaultProps
= Pre.defaultProps
= Q.defaultProps
= S.defaultProps
= Strong.defaultProps
= Sub.defaultProps
= Sup.defaultProps
= U.defaultProps
= Var.defaultProps = {
                                  breakWords: true
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
                                  /**
                                   * If true words break with hyphens.
                                   * If false text is forced into a single truncated line.
                                   */
                                  breakWords: PropTypes.bool,
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
