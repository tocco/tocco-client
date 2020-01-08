import React from 'react'
import PropTypes from 'prop-types'
import {Button, Menu} from 'tocco-ui'

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
        <Menu.ItemFlyout label={currentBusinessUnit.label} onToggle={handleBusinessUnitOpen} >
          <Menu.Stack>
            {
              businessUnits.map(bU => (
                <Menu.Item key={`buMenu-${bU.id}` }>
                  <Button
                    disabled={bU.id === currentBusinessUnit.id}
                    label={bU.label}
                    onClick={() => { changeBusinessUnit(bU.id) }}/>
                </Menu.Item>
              ))
            }
          </Menu.Stack>
        </Menu.ItemFlyout>
        <Menu.ItemFlyout label={username} >
          <Menu.Stack>
            <Menu.Item><Button label="Logout" onClick={doLogout}/></Menu.Item>
          </Menu.Stack>
        </Menu.ItemFlyout>
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
