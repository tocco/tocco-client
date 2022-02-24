import {createBrowserHistory} from 'history'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {withTheme} from 'styled-components'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles, LoadMask} from 'tocco-ui'
import {route, useWindowWidth} from 'tocco-util'

import ErrorView from '../ErrorView'
import Header from '../Header'
import navigationStrategy from './../../routes/entities/utils/navigationStrategy'
import AdminContent from './AdminContent'
import {StyledContent, StyledWrapper} from './StyledComponents'

const Admin = ({
  initializeNavigation,
  baseRoute,
  menuOpen,
  setMenuOpen,
  confirm,
  loadPrincipal,
  loadSettingsAndPreferences,
  adminAllowed
}) => {
  const [history, setHistory] = useState(null)

  // only on mount
  useEffect(() => {
    initializeHistory()
    initializeNavigation()
    loadPrincipal()
    loadSettingsAndPreferences()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const initializeHistory = () => {
    const browserHistory = createBrowserHistory({
      getUserConfirmation: (message, confirmCallback) => {
        confirm(
          '',
          message,
          <FormattedMessage id="client.common.ok" />,
          <FormattedMessage id="client.common.cancel" />,
          () => confirmCallback(true),
          () => confirmCallback(false)
        )
      }
    })
    setHistory(browserHistory)
  }

  const adminAllowedContent = adminAllowed && <AdminContent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

  const adminForbiddenContent = adminAllowed === false && (
    <StyledContent>
      <ErrorView
        title={<FormattedMessage id={'client.admin.error.no_roles.title'} />}
        message={<FormattedMessage id={'client.admin.error.no_roles.message'} />}
      />
    </StyledContent>
  )

  return (
    <LoadMask required={[history !== null]}>
      <route.CustomRouter history={history} basename={baseRoute}>
        <GlobalStyles />
        <notification.Notifications navigationStrategy={navigationStrategy()} />
        <StyledWrapper width={useWindowWidth()}>
          <Header />
          {adminAllowedContent || adminForbiddenContent}
        </StyledWrapper>
      </route.CustomRouter>
    </LoadMask>
  )
}

Admin.propTypes = {
  baseRoute: PropTypes.string,
  loggedIn: PropTypes.bool,
  menuOpen: PropTypes.bool,
  loadPrincipal: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  initializeNavigation: PropTypes.func.isRequired,
  loadSettingsAndPreferences: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  adminAllowed: PropTypes.bool.isRequired
}

export default withTheme(Admin)
