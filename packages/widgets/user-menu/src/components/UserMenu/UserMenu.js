import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {MenuItem, Menu, Icon} from 'tocco-ui'

import {StyledButton, StyledHeader, StyledIconWrapper, StyledLabelWrapper} from './StyledComponents'

const UserMenu = ({loggedIn, username, logout}) => {
  const referenceElement = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(open => !open)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  const ThisMenu = () => (
    <Menu referenceElement={referenceElement.current} open={menuOpen} onClose={handleClose}>
      <MenuItem onClick={logout}>
        <FormattedMessage id="client.user-menu.logout" />
      </MenuItem>
    </Menu>
  )

  const chevronIcon = menuOpen ? 'chevron-up' : 'chevron-down'

  return (
    <StyledHeader>
      {loggedIn && (
        <StyledButton type="button" ref={referenceElement} onClick={toggleMenu}>
          <StyledLabelWrapper>{username}</StyledLabelWrapper>
          <StyledIconWrapper>
            <Icon icon={chevronIcon} />
          </StyledIconWrapper>
          {menuOpen && <ThisMenu />}
        </StyledButton>
      )}
    </StyledHeader>
  )
}

UserMenu.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

export default UserMenu
