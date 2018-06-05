import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const StyledDd = styled.dd`
  && {
    ${props => declareFont(props)}
    margin: 0;
  }
`

const StyledDl = styled.dl`
  && {
    margin: 0 0 ${props => theme('space.5')};
  }
`

const StyledDt = styled.dt`
  && {
    ${props => declareFont(props, {fontWeight: 700})}
    margin: 0;
  }
`

const StyledLi = styled.li`
  && {
    ${props => declareFont(props)}
  }
`

const StyledList = styled.ol`
  && {
    display: block;
    list-style-position: outside;
    margin: 0 0 ${props => theme('space.5')} 1.25rem;
    padding: 0;

    & & {
      margin-bottom: 0;
    }
  }
`

const StyledOl = StyledList.extend`
  list-style-type: decimal;
`

const StyledUl = StyledList.withComponent('ul').extend`
  && {
    list-style-type: disc;
  }
`

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
  StyledDd,
  StyledDl,
  StyledDt,
  StyledLi,
  StyledOl,
  StyledUl,
  Ul
}
