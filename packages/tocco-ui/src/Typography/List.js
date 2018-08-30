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

const Dd = props =>
  <StyledDd
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledDd>

const Dl = props => <StyledDl>{props.children}</StyledDl>

const Dt = props =>
  <StyledDt
    breakWords={props.breakWords}
    title={props.breakWords ? undefined : getTextOfChildren(props.children)}
  >{props.children}</StyledDt>

const Li = props => <StyledLi>{props.children}</StyledLi>

const Ol = props => <StyledOl>{props.children}</StyledOl>

const Ul = props => <StyledUl>{props.children}</StyledUl>

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
    children: PropTypes.node
  }

Dl.propTypes
= Li.propTypes
= Ol.propTypes
= Ul.propTypes = {
        children: PropTypes.node
      }

export {
  Dd,
  Dl,
  Dt,
  Li,
  Ol,
  Ul
}
