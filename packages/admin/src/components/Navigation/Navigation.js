import React from 'react'
import styled from 'styled-components'

import {StyledLink} from '../StyledLink'

const StyledUl = styled.ul`
  list-style-type: none;
  padding-inline-start: 10px;
  li{
   list-style-type: none;
  }
`

const Navigation = props => {
  return (
    <nav>
      <StyledUl>
        <li>

        </li>
        <li>
          <StyledLink to="/e">Entity Browser</StyledLink>
          <ul>
            <li><StyledLink to="/e/User">User</StyledLink></li>
            <li><StyledLink to="/e/Address">Address</StyledLink></li>
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
}

export default Navigation
