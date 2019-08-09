import React, {useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {StyledLink} from '../StyledLink'

const StyledUl = styled.ul`
  list-style-type: none;
  padding-inline-start: 10px;
`

const StyledInput = styled.input`
  border-radius: 30px;
  background-color: white;
  width: 90%;
  font-size:14px;
  padding: 4px 7px;
  :focus {
      outline: none;
  }
`

const Navigation = props => {
  const inputEl = useRef(null)

  setTimeout(() => {
    inputEl.current.select()
    inputEl.current.focus()
  })

  return (
    <nav>
      <StyledInput ref={inputEl}/>
      <StyledUl>
        <li>
          <StyledLink to="/e">Entities</StyledLink>
          <ul>
            {
              props.entities.map((entity, idx) => {
                return (
                  <li key={idx}>
                    <StyledLink to={`/e/${entity.entity}`} onClick={props.onClick}>{entity.label}</StyledLink>
                  </li>
                )
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
  entities: PropTypes.array,
  onClick: PropTypes.func
}

export default Navigation
