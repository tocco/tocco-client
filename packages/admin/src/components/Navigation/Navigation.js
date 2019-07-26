import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {StyledLink} from '../StyledLink'

const StyledUl = styled.ul`
  list-style-type: none;
  padding-inline-start: 10px;
`

const Navigation = props => {
  return (
    <nav>
      <StyledUl>
        <li>
          <StyledLink to="/e">Entities</StyledLink>
          <ul>
            {
              props.entities.map((entity, idx) => {
                return <li key={idx}><StyledLink to={`/e/${entity.entity}`}>{entity.label}</StyledLink></li>
              })
            }
          </ul>
        </li>
        <li>
          <StyledLink to="/s">Settings</StyledLink>
        </li>
      </StyledUl>
    </nav>
  )
}

Navigation.propTypes = {
  entities: PropTypes.array
}

export default Navigation
