import React from 'react'
import {components} from 'react-select'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const StyledMoreOptionsAvailable = styled.div`
  && {
    ${props => declareFont(props, {
    color: theme('colors.signal.warning.text')(props),
    lineHeight: 'normal'
  })}
    cursor: default;
    padding: ${props => props.reactSelectTheme.spacing.baseUnit * 2}px
             ${props => props.reactSelectTheme.spacing.baseUnit * 3}px;
  }
`

const MenuList = props => {
  return (
    <components.MenuList {...props}>
      {props.children}
      {props.moreOptionsAvailable
        && <StyledMoreOptionsAvailable reactSelectTheme={props.theme}>
          {props.moreOptionsAvailableText}
        </StyledMoreOptionsAvailable>
      }
    </components.MenuList>
  )
}

export default MenuList
