import React from 'react'
import PropTypes from 'prop-types'
import {MenuItem, ButtonMenu} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {
  StyledHeader,
  StyledConfig
} from './StyledComponents'

const Header = ({username, currentBusinessUnit, businessUnits, loadBusinessUnits, changeBusinessUnit, doLogout}) => {
  const handleBusinessUnitOpen = () => {
    if (businessUnits.length === 0) {
      loadBusinessUnits()
    }
  }

  return (
    <StyledHeader>
      <StyledConfig>
        <ButtonMenu label={currentBusinessUnit.label} onOpen={handleBusinessUnitOpen}>
          {
            businessUnits.map(bU =>
              <MenuItem
                key={`buMenu-${bU.id}` }
                disabled={bU.id === currentBusinessUnit.id}
                onClick={() => { changeBusinessUnit(bU.id) }}
              >
                {bU.label}
              </MenuItem>
            )
          }
        </ButtonMenu>
        <ButtonMenu label={username}>
          <MenuItem onClick={doLogout}><FormattedMessage id="client.admin.menu.logout"/></MenuItem>
        </ButtonMenu>
      </StyledConfig>
    </StyledHeader>

  )
}

const bUPropType = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string
})

Header.propTypes = {
  username: PropTypes.string,
  currentBusinessUnit: bUPropType,
  businessUnits: PropTypes.arrayOf(bUPropType),
  doLogout: PropTypes.func.isRequired,
  changeBusinessUnit: PropTypes.func.isRequired,
  loadBusinessUnits: PropTypes.func.isRequired
}

export default Header
