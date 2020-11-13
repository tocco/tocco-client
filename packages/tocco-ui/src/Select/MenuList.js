import React from 'react'
import {components} from 'react-select'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  declareFont,
  theme
} from '../utilStyles'

const StyledMoreOptionsAvailable = styled.div`
  && {
    ${props => declareFont(props, {
    color: theme.color('signal.warning.text'),
    lineHeight: 'normal'
  })}
    cursor: default;
    padding: ${props =>
      `${props.reactSelectTheme.spacing.baseUnit * 2}px ${props.reactSelectTheme.spacing.baseUnit * 3}px`
    };
  }
`

const MenuList = props => {
  const {moreOptionsAvailable, moreOptionsAvailableText} = props.selectProps
  return (
    <components.MenuList {...props}>
      {props.children}
      {moreOptionsAvailable
        && <StyledMoreOptionsAvailable reactSelectTheme={props.theme}>
          {moreOptionsAvailableText}
        </StyledMoreOptionsAvailable>
      }
    </components.MenuList>
  )
}

MenuList.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string
  }),
  theme: PropTypes.object
}

export default MenuList
