import React from 'react'
import PropTypes from 'prop-types'
import {MenuItem, ButtonMenu, BallMenu, Link} from 'tocco-ui'
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

const StyledLinkWrapper = styled.span`
  && {
    a {
      text-decoration: none;
    }
  }
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
          <BallMenu buttonProps={{icon: 'question-circle'}}>
            <StyledLinkWrapper>
              {niceVersion && <MenuItem onClick={() => {}}>
                <Link
                  neutral
                  href={`https://${niceVersion}docs.tocco.ch/de/`}
                  target="_blank"
                >
                  <FormattedMessage id="client.admin.menu.doc"/>
                </Link>
              </MenuItem>}
              <MenuItem onClick={() => {}}>
                <Link
                  neutral
                  href="/nice2/swagger"
                  target="_blank"
                >
                  <FormattedMessage id="client.admin.menu.restDoc"/>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => {
                openModalComponent('about', 'client.admin.menu.aboutToccoTitle', null, () => <AboutTocco/>, true)
              }}>
                <FormattedMessage id="client.admin.menu.aboutToccoTitle"/>
              </MenuItem>
            </StyledLinkWrapper>
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
