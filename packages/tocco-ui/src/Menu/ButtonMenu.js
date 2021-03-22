import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'

import {Menu, Icon, Button, ButtonGroup} from '../'
import {StyledIconButtonWrapper, StyledIconWrapper, StyledIconTypeWrapper} from './StyledComponents'

/**
 *  Button with a menu that pops out on click.
 */
const ButtonMenu = props => {
  const {onOpen, children, onClick, buttonProps, label, iconType} = props
  const referenceElement = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [onOpenCalled, setOnOpenCalled] = useState(false)

  const iconMap = {
    communications: 'comments',
    actions: 'cog-light',
    output: 'file-export-light',
    new: 'plus-light'
  }

  const handleClick = () => {
    setMenuOpen(!menuOpen)
    if (onOpen && !onOpenCalled) {
      onOpen()
      setOnOpenCalled(true)
    }
  }

  const handleClose = () => setMenuOpen(false)

  const angleIcon = menuOpen ? 'angle-up' : 'angle-down'

  const ThisMenu = () => <Menu
    referenceElement={referenceElement.current}
    open={menuOpen}
    onClose={handleClose}
  >
    {children}
  </Menu>

  if (onClick) {
    return <>
      <ButtonGroup ref={referenceElement}>
        <Button {...buttonProps || {}} onClick={onClick} data-cy={props['data-cy']}>
          {
            iconMap[iconType] && (
              <StyledIconTypeWrapper>
                <Icon icon={iconMap[iconType]}/>
              </StyledIconTypeWrapper>
            )
          }
          {label}
        </Button>
        <StyledIconButtonWrapper icon={angleIcon} onClick={handleClick} {...buttonProps || {}} />
      </ButtonGroup>
      {menuOpen && <ThisMenu/>}
    </>
  }

  return <>
    <Button
      data-cy={props['data-cy']}
      {...buttonProps || {}} ref={referenceElement}
      onClick={handleClick}
    >
      {
        iconMap[iconType] && (
          <StyledIconTypeWrapper>
            <Icon icon={iconMap[iconType]}/>
          </StyledIconTypeWrapper>
        )
      }
      {label}
      <StyledIconWrapper>
        <Icon icon={angleIcon}/>
      </StyledIconWrapper>
    </Button>
    {menuOpen && <ThisMenu/>}
  </>
}

ButtonMenu.propTypes = {
  /**
   * Optional handler. If defined, a split button will be rendered
   */
  'onClick': PropTypes.func,
  /**
   * Will be shown on the button
   */
  'label': PropTypes.string,
  /**
   * Will be passed to the underlying Button
   */
  'buttonProps': PropTypes.object,
  /**
   * Tree of <MenuItem>
   */
  'children': PropTypes.any,
  /**
   * Callback when the menu is opened (only called once)
   */
  'onOpen': PropTypes.func,
  /**
   * cypress selector string
   */
  'data-cy': PropTypes.string,
  /**
   * Icon Type to be shown on the button
   */
  'iconType': PropTypes.string
}

export default ButtonMenu
