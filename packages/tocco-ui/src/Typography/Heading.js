import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from './'

const declareHeaderFont = props => {
  let fontSize = theme('fontSizes.2')(props)

  switch (props.styledLike) {
    case 'H1':
      fontSize = theme('fontSizes.7')(props)
      break
    case 'H2':
      fontSize = theme('fontSizes.6')(props)
      break
    case 'H3':
      fontSize = theme('fontSizes.5')(props)
      break
    case 'H4':
      fontSize = theme('fontSizes.4')(props)
      break
    case 'H5':
      fontSize = theme('fontSizes.3')(props)
      break
    case 'H6':
      fontSize = theme('fontSizes.2')(props)
      break
  }

  return declareFont(props, {fontWeight: 700, fontSize: fontSize})
}

const declareSpace = props => {
  return `
    margin-top: ${theme('space.6')(props)};
    margin-bottom: ${theme('space.5')(props)};

    h1 + &,
    h2 + &,
    h3 + &,
    h4 + &,
    h5 + &,
    h6 + & {
      margin-top: 0;
    }

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `
}

const StyledH1 = styled.h1`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH2 = styled.h2`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH3 = styled.h3`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH4 = styled.h4`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH5 = styled.h5`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH6 = styled.h6`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

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
  H6,
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6
}
