import React from 'react'
import PropTypes from 'prop-types'
import {MenuItem, ButtonMenu, BallMenu, StyledBall, scale} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {PasswordUpdateApp} from 'tocco-login/src/main'
import TwoFactorConnectorApp from 'tocco-two-factor-connector/src/main'

import NotificationCenterButton from './NotificationCenterButton'
import {
  StyledBackgroundCover,
  StyledHeader,
  StyledConfig,
  StyledBackgroundLogo
} from './StyledComponents'
import AboutTocco from '../AboutTocco'

const StyledBallMenuWrapper = styled.span`
  display: flex;
  margin-top: 2px;

  ${StyledBall} {
    font-size: ${scale.font(1)};
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
  openModalComponent,
  removeModalComponent,
  info,
  intl
}) => {
  const handleBusinessUnitOpen = () => {
    if (businessUnits.length === 0) {
      loadBusinessUnits()
    }
  }

  const openPasswordUpdate = () => {
    openModalComponent(
      'passwordUpdateModal',
      'client.login.passwordUpdate.title',
      null,
      () => <PasswordUpdateApp username={username} success={() => {
        removeModalComponent('passwordUpdateModal')
        info('success', 'client.login.passwordUpdate.success')
      }}/>
      , true
    )
  }

  const openTwoFactorConnector = () => {
    openModalComponent(
      'passwordUpdateModal',
      'client.actions.two-factor-connector.title',
      null,
      () => <TwoFactorConnectorApp
        onSuccess={() => {
          removeModalComponent('passwordUpdateModal')
        }}
      />,
      true)
  }

  const msg = id => intl.formatMessage({id})

  return <>
    <StyledBackgroundLogo runEnv={runEnv}/>
    <StyledBackgroundCover/>
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
          <MenuItem onClick={openPasswordUpdate}><FormattedMessage id="client.admin.menu.passwordUpdate"/></MenuItem>
          <MenuItem onClick={openTwoFactorConnector}>
            <FormattedMessage id="client.admin.menu.twoFactorConnector"/>
          </MenuItem>
          <MenuItem onClick={doLogout}><FormattedMessage id="client.admin.menu.logout"/></MenuItem>
        </ButtonMenu>
        <StyledBallMenuWrapper>
          <BallMenu buttonProps={{
            icon: 'question-circle',
            title: msg('client.admin.header.help')
          }}>
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
              openModalComponent('about', null, null, () => <AboutTocco/>, true)
            }}>
              <FormattedMessage id="client.admin.menu.aboutToccoTitle"/>
            </MenuItem>
          </BallMenu>
         <NotificationCenterButton/>
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
  openModalComponent: PropTypes.func.isRequired,
  removeModalComponent: PropTypes.func.isRequired,
  info: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
}

export default Header
