import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {MenuItem, ButtonMenu} from 'tocco-ui'

import {StyledHeader} from './StyledComponents'

const UserMenu = ({loggedIn, username, logout}) => {
  if (loggedIn) {
    return (
      <StyledHeader>
        <ButtonMenu label={username}>
          <MenuItem onClick={logout}>
            <FormattedMessage id="client.user-menu.logout" />
          </MenuItem>
        </ButtonMenu>
      </StyledHeader>
    )
  } else {
    return null
  }
}

UserMenu.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

export default UserMenu
