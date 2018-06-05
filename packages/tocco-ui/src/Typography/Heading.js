import PropTypes from 'prop-types'
import React from 'react'

import {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6
} from './StyledHeading'

const H1 = props => {
  return (
    <StyledH1 styledLike={props.styledLike}>
      {props.children}
    </StyledH1>
  )
}

H1.defaultProps = {
  styledLike: 'H1'
}

const H2 = props => {
  return (
    <StyledH2 styledLike={props.styledLike}>
      {props.children}
    </StyledH2>
  )
}

H2.defaultProps = {
  styledLike: 'H2'
}

const H3 = props => {
  return (
    <StyledH3 styledLike={props.styledLike}>
      {props.children}
    </StyledH3>
  )
}

H3.defaultProps = {
  styledLike: 'H3'
}

const H4 = props => {
  return (
    <StyledH4 styledLike={props.styledLike}>
      {props.children}
    </StyledH4>
  )
}

H4.defaultProps = {
  styledLike: 'H4'
}

const H5 = props => {
  return (
    <StyledH5 styledLike={props.styledLike}>
      {props.children}
    </StyledH5>
  )
}

H5.defaultProps = {
  styledLike: 'H5'
}

const H6 = props => {
  return (
    <StyledH6 styledLike={props.styledLike}>
      {props.children}
    </StyledH6>
  )
}

H6.defaultProps = {
  styledLike: 'H6'
}

H1.propTypes
= H2.propTypes
= H3.propTypes
= H4.propTypes
= H5.propTypes
= H6.propTypes = {
            children: PropTypes.node.isRequired,
            styledLike: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6'])
          }

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6
}
