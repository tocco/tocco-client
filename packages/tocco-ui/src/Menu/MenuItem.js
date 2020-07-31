import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {theme} from '../'
import {
  declareFont,
  interactiveStyling,
  scale
} from '../utilStyles'

export const StyledMenuItem = styled.div`
  min-width: 200px;
  max-width: 300px;
  background-color: ${theme.color('secondaryLight')};
`

export const StyledItemLabel = styled.div`
  cursor: ${({hasOnClick}) => hasOnClick ? 'pointer' : 'default'};
  ${declareFont()}
  ${interactiveStyling}
  padding:
    ${scale.space(-2)}
    ${scale.space(-0.5)}
    ${scale.space(-2)}
    calc(${scale.space(-0.5)} + ${({level}) => (level || 0) * 5 + 'px'});
  font-weight: ${({isGroup}) => isGroup ? theme.fontWeight('bold') : theme.fontWeight('regular')};
  box-shadow: none;

  span > * {
    margin-right: 4px;
  }
`

/**
 * Item of Menu
 */
const MenuItem = ({
  children,
  onClick,
  onClose,
  disabled,
  closeOnClick,
  title,
  level
}) => {
  const childrenArr = React.Children.toArray(children).filter(Boolean)
  const isGroup = childrenArr.length > 1
  const hasOnClick = Boolean(onClick)

  const handleClick = e => {
    if (hasOnClick && !disabled) {
      onClick()

      if (closeOnClick && onClose) {
        onClose()
      }
    }
    e.stopPropagation()
  }

  return <StyledMenuItem
    onClick={handleClick} level={level}>
    {
      childrenArr.map((child, idx) => {
        const lvl = level ? level + 1 : 1
        if (child.type && child.type.displayName === 'MenuItem') {
          return React.cloneElement(child, {
            ...child.props,
            onClose: onClose,
            closeOnClick: closeOnClick,
            level: lvl,
            key: `menu-item-${idx}-${lvl}`
          })
        }
        return <StyledItemLabel
          key={`menu-item-label-${idx}-${lvl}`}
          hasOnClick={hasOnClick}
          isGroup={isGroup}
          title={title}
          disabled={disabled}
          look="raised"
          level={level}
        >
          {child}
        </StyledItemLabel>
      })
    }
  </StyledMenuItem>
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
