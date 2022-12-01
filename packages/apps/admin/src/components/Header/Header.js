import PropTypes from 'prop-types'
import {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {PasswordUpdateApp} from 'tocco-login/src/main'
import TwoFactorConnectorApp from 'tocco-two-factor-connector/src/main'
import {MenuItem, ButtonMenu, BallMenu, RouterLinkButton, SwitchButton} from 'tocco-ui'

import {getDocsUrl} from '../../utils/docsUtils'
import AboutTocco from '../AboutTocco'
import NotificationCenterButton from './NotificationCenterButton'
import {
  StyledBackgroundCover,
  StyledHeader,
  StyledConfig,
  StyledBackgroundLogo,
  StyledBallMenuWrapper
} from './StyledComponents'

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
  intl,
  setMenuOpen
}) => {
  const [checked, setChecked] = useState(false)

  const handleChange = e => {
    setChecked(e.target.checked)
  }

  const handleBusinessUnitOpen = () => {
    if (businessUnits.length === 0) {
      loadBusinessUnits()
    }
  }

  const openPasswordUpdate = () => {
    const handleSuccess = () => {
      removeModalComponent('passwordUpdateModal')
      info('success', 'client.login.passwordUpdate.success')
    }

    openModalComponent(
      'passwordUpdateModal',
      'client.login.passwordUpdate.title',
      null,
      () => <PasswordUpdateApp username={username} success={handleSuccess} />,
      true
    )
  }

  const openTwoFactorConnector = () => {
    const handleOnSuccess = () => {
      removeModalComponent('passwordUpdateModal')
    }

    openModalComponent(
      'passwordUpdateModal',
      'client.actions.two-factor-connector.title',
      null,
      () => <TwoFactorConnectorApp onSuccess={handleOnSuccess} />,
      true
    )
  }

  const BusinessUnitMenuItems = businessUnits.map(bU => (
    <MenuItem
      key={`buMenu-${bU.id}`}
      disabled={bU.id === currentBusinessUnit.id}
      onClick={() => changeBusinessUnit(bU.id)}
    >
      {bU.label}
    </MenuItem>
  ))

  const closeMenu = () => setMenuOpen(false)
  const msg = id => intl.formatMessage({id})
  const MenuItemDocumentation = niceVersion && (
    <MenuItem
      onClick={() => {
        window.open(getDocsUrl(niceVersion), '_blank')
      }}
    >
      <FormattedMessage id="client.admin.menu.doc" />
    </MenuItem>
  )
  const MenuItemRestDocumentation = (
    <MenuItem
      onClick={() => {
        window.open('/nice2/swagger', '_blank')
      }}
    >
      <FormattedMessage id="client.admin.menu.restDoc" />
    </MenuItem>
  )
  const MenuItemAbout = (
    <MenuItem
      onClick={() => {
        openModalComponent('about', null, null, () => <AboutTocco />, true)
      }}
    >
      <FormattedMessage id="client.admin.menu.aboutToccoTitle" />
    </MenuItem>
  )

  return (
    <>
      <StyledBackgroundLogo runEnv={runEnv} />
      <StyledBackgroundCover />
      <StyledHeader>
        <StyledConfig>
          <RouterLinkButton to="/dashboard/reload" onClick={closeMenu} icon={'house-blank'}>
            <FormattedMessage id="client.admin.dashboard" />
          </RouterLinkButton>
          <ButtonMenu label={currentBusinessUnit.label} onOpen={handleBusinessUnitOpen}>
            {BusinessUnitMenuItems}
          </ButtonMenu>
          <ButtonMenu label={username}>
            <MenuItem onClick={openPasswordUpdate}>
              <FormattedMessage id="client.admin.menu.passwordUpdate" />
            </MenuItem>
            <MenuItem onClick={openTwoFactorConnector}>
              <FormattedMessage id="client.admin.menu.twoFactorConnector" />
            </MenuItem>
            <MenuItem onClick={doLogout}>
              <FormattedMessage id="client.admin.menu.logout" />
            </MenuItem>
          </ButtonMenu>
          <StyledBallMenuWrapper>
            <BallMenu
              buttonProps={{
                icon: 'question-circle',
                title: msg('client.admin.header.help')
              }}
            >
              {MenuItemDocumentation}
              {MenuItemRestDocumentation}
              {MenuItemAbout}
            </BallMenu>
            <NotificationCenterButton />
            <SwitchButton checked={checked} onChange={handleChange} />
          </StyledBallMenuWrapper>
        </StyledConfig>
      </StyledHeader>
    </>
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
  loadBusinessUnits: PropTypes.func.isRequired,
  runEnv: PropTypes.string,
  niceVersion: PropTypes.string,
  openModalComponent: PropTypes.func.isRequired,
  removeModalComponent: PropTypes.func.isRequired,
  info: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  setMenuOpen: PropTypes.func.isRequired
}

export default Header
