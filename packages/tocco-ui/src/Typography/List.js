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

const Dd = props => {
  return (
    <StyledDd>{props.children}</StyledDd>
  )
}

const Dt = props => {
  return (
    <StyledDt>{props.children}</StyledDt>
  )
}

const Dl = props => {
  return (
    <StyledDl>{props.children}</StyledDl>
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

Dd.propTypes
= Dl.propTypes
= Dt.propTypes
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
