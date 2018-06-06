import PropTypes from 'prop-types'
import React from 'react'

import {
  StyledDd,
  StyledDl,
  StyledDt,
  StyledLi,
  StyledOl,
  StyledUl
} from './StyledList'
import {getTextOfChildren} from '../utilStyles'

const Dd = props => {
  return (
    <StyledDd
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledDd>
  )
}

const Dl = props => {
  return (
    <StyledDl>{props.children}</StyledDl>
  )
}

const Dt = props => {
  return (
    <StyledDt
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledDt>
  )
}

const Li = props => {
  return (
    <StyledLi>{props.children}</StyledLi>
  )
}

const Ol = props => {
  return (
    <StyledOl>{props.children}</StyledOl>
  )
}

const Ul = props => {
  return (
    <StyledUl>{props.children}</StyledUl>
  )
}

Dd.defaultProps
= Dt.defaultProps = {
    breakWords: true
  }

Dd.propTypes
= Dt.propTypes = {
    /**
             * If true words break with hyphens. If false text is forced into a single truncated line.
             */
    breakWords: PropTypes.bool,
    children: PropTypes.node.isRequired
  }

Dl.propTypes
= Li.propTypes
= Ol.propTypes
= Ul.propTypes = {
        children: PropTypes.node.isRequired
      }

export {
  Dd,
  Dl,
  Dt,
  Li,
  Ol,
  Ul
}
