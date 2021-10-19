import React from 'react'
import PropTypes from 'prop-types'
import {BallMenu, MenuItem} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {StyledMenuWrapper} from './StyledComponents'

const Menu = ({displayInfoBoxSettings, resetInfoBoxSettings}) => {
  return <StyledMenuWrapper>
    <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
      <MenuItem onClick={displayInfoBoxSettings}>
        <FormattedMessage id="client.dashboard.preferences.show"/>
      </MenuItem>
      <MenuItem onClick={resetInfoBoxSettings}>
        <FormattedMessage id="client.dashboard.preferences.reset"/>
      </MenuItem>
    </BallMenu>
  </StyledMenuWrapper>
}

Menu.propTypes = {
  displayInfoBoxSettings: PropTypes.func.isRequired,
  resetInfoBoxSettings: PropTypes.func.isRequired
}

export default Menu
