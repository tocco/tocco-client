import React from 'react'
import PropTypes from 'prop-types'
import {MenuItem, ButtonMenu, BallMenu} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'

import {
  StyledHeader,
  StyledConfig,
  StyledBackgroundLogo
} from './StyledComponents'
import AboutTocco from '../AboutTocco'

const StyledBallMenuWrapper = styled.span`
  margin-top: 2px;
`

const Header = ({
  username,
  currentBusinessUnit,
  businessUnits,
  loadBusinessUnits,
  changeBusinessUnit,
  doLogout,
  runEnv,
  niceVersion,
  openModalComponent
}) => {
  const handleBusinessUnitOpen = () => {
    if (businessUnits.length === 0) {
      loadBusinessUnits()
    }
  }

  return <>
    <StyledBackgroundLogo runEnv={runEnv}/>
    <StyledHeader>
      <StyledConfig>
        <ButtonMenu label={currentBusinessUnit.label} onOpen={handleBusinessUnitOpen}>
          {
            businessUnits.map(bU =>
              <MenuItem
                key={`buMenu-${bU.id}`}
                disabled={bU.id === currentBusinessUnit.id}
                onClick={() => {
                  changeBusinessUnit(bU.id)
                }}
              >
                {bU.label}
              </MenuItem>
            )
          }
        </ButtonMenu>
        <ButtonMenu label={username}>
          <MenuItem onClick={doLogout}><FormattedMessage id="client.admin.menu.logout"/></MenuItem>
        </ButtonMenu>
        <StyledBallMenuWrapper>
          <BallMenu buttonProps={{icon: 'info'}}>
            {niceVersion && <MenuItem onClick={() => {
              window.open(
                  `https://${niceVersion.replace('.', '')}.docs.tocco.ch/de/`,
                  '_blank'
              )
            }}>
              <FormattedMessage id="client.admin.menu.doc"/>
            </MenuItem>}
            <MenuItem onClick={() => {
              window.open(
                '/nice2/swagger',
                '_blank'
              )
            }}>
              <FormattedMessage id="client.admin.menu.restDoc"/>
            </MenuItem>
            <MenuItem onClick={() => {
              openModalComponent('about', 'client.admin.menu.aboutToccoTitle', null, () => <AboutTocco/>, true)
            }}>
              <FormattedMessage id="client.admin.menu.aboutToccoTitle"/>
            </MenuItem>
          </BallMenu>
        </StyledBallMenuWrapper>
      </StyledConfig>
    </StyledHeader>
  </>
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
  loadBusinessUnits: PropTypes.func.isRequired,
  runEnv: PropTypes.string,
  niceVersion: PropTypes.string,
  openModalComponent: PropTypes.func.isRequired
}

export default Header
