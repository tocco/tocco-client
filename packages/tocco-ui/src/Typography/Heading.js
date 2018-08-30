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
import {getTextOfChildren} from '../utilStyles'

/**
 * Use <H1>, <H2>, <H3>, <H4>, <H5> and <H6> according there semantic hierarchy. Since only one <H1> should exist on
 * a single webpage and React components are usually embeded, use <H2> or lower. Utilize prop styledLike to tweek
 * size and space.
 */

const H1 = props =>
  <StyledH1
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH1>

H1.defaultProps = {
  breakWords: true,
  styledLike: 'H1'
}

const H2 = props =>
  <StyledH2
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH2>

H2.defaultProps = {
  breakWords: true,
  styledLike: 'H2'
}

const H3 = props =>
  <StyledH3
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH3>

H3.defaultProps = {
  breakWords: true,
  styledLike: 'H3'
}

const H4 = props =>
  <StyledH4
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH4>

H4.defaultProps = {
  breakWords: true,
  styledLike: 'H4'
}

const H5 = props =>
  <StyledH5
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH5>

H5.defaultProps = {
  breakWords: true,
  styledLike: 'H5'
}

const H6 = props =>
  <StyledH6
    breakWords={props.breakWords}
    styledLike={props.styledLike}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >
    {props.children}
  </StyledH6>

H6.defaultProps = {
  breakWords: true,
  styledLike: 'H6'
}

H1.propTypes
= H2.propTypes
= H3.propTypes
= H4.propTypes
= H5.propTypes
= H6.propTypes = {
            /**
             * If true words break with hyphens. If false text is forced into a single truncated line.
             */
            breakWords: PropTypes.bool,
            children: PropTypes.node,
            /**
             * Control size and space independently from semantic meaning.
             */
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
