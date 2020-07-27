import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {theme} from '../'
import {
  declareFont,
  interactiveStyling
} from '../utilStyles'

export const StyledMenuItem = styled.div`
  min-width: 200px;
  max-width: 300px;
`

export const StyledItemLabel = styled.div`
  cursor: ${props => props.hasOnClick ? 'pointer' : 'default'};
  ${declareFont()}
  ${interactiveStyling}
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: ${props => 10 + (props.level || 0) * 5 + 'px'};
  font-weight: ${props => props.isGroup ? theme.fontWeight('bold') : theme.fontWeight('regular')};
`

/**
 * Item of Menu
 */
const MenuItem = props => {
  const children = React.Children.toArray(props.children).filter(c => c)
  const isGroup = children.length > 1
  const hasOnClick = !!props.onClick

  const handleClick = e => {
    if (hasOnClick && !props.disabled) {
      props.onClick()

      if (props.closeOnClick && props.onClose) {
        props.onClose()
      }
    }
    e.stopPropagation()
  }

  return (
    <StyledMenuItem
      onClick={handleClick} level={props.level}>
      {
        children.map((child, idx) => {
          const level = props.level ? props.level + 1 : 1
          if (child.type && child.type.displayName === 'MenuItem') {
            return React.cloneElement(child, {
              ...child.props,
              onClose: props.onClose,
              closeOnClick: props.closeOnClick,
              level,
              key: `menu-item-${idx}-${level}`
            })
          }
          return <StyledItemLabel
            key={`menu-item-label-${idx}-${level}`}
            hasOnClick={hasOnClick}
            isGroup={isGroup}
            title={props.title}
            disabled={props.disabled}
            look="raised"
            level={props.level}
          >
            {child}
          </StyledItemLabel>
        })
      }
    </StyledMenuItem>
  )
}

MenuItem.defaultProps = {
  closeOnClick: true
}

MenuItem.displayName = 'MenuItem'

MenuItem.propTypes = {
  /**
   * Can either be another MenuItem for tree hierarchy or an element that gets rendered e.g. label
   */
  children: PropTypes.any,
  /**
   * Will be called on click
   */
  onClick: PropTypes.func,
  /**
   * If true, the Item will be read only
   */
  disabled: PropTypes.bool,
  /**
   * Html attribute. Will be shown on mouse over
   */
  title: PropTypes.string,
  /**
   * Will be passed down from Menu. Indicated whether the menu should close or not on click.
   */
  closeOnClick: PropTypes.bool,
  /**
   *  Will be passed down from Menu.
   */
  onClose: PropTypes.func,
  /**
   * Will be set automatically and indicates the level
   */
  level: PropTypes.number
}

export default MenuItem
