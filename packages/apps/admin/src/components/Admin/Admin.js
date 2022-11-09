import {createBrowserHistory} from 'history'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {withTheme} from 'styled-components'
import {notification, errorLogging} from 'tocco-app-extensions'
import {BurgerButton, GlobalStyles, LoadMask, useWindowWidth} from 'tocco-ui'
import {viewPersistor} from 'tocco-util'

import DashboardRoute from '../../routes/dashboard'
import DocsRoute from '../../routes/docs'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import ErrorView from '../ErrorView'
import Header from '../Header'
import InvalidSession from '../InvalidSession'
import Navigation from '../Navigation'
import navigationStrategy from './../../routes/entities/utils/navigationStrategy'
import {burgerMenuStyles, StyledContent, StyledMenu, StyledWrapper} from './StyledComponents'

const Admin = ({
  initializeNavigation,
  setMenuOpen,
  menuOpen,
  baseRoute,
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
      ...(baseRoute && {basename: baseRoute}),
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

  const isMenuOpen = state => {
    if (state.isOpen !== menuOpen) {
      setMenuOpen(state.isOpen)
    }
  }

  const handleClick = () => {
    setMenuOpen(false)
    viewPersistor.clearPersistedViews()
  }

  const adminAllowedContent = adminAllowed && (
    <>
      <StyledMenu
        isOpen={menuOpen}
        onStateChange={isMenuOpen}
        customCrossIcon={false}
        customBurgerIcon={<BurgerButton isOpen={menuOpen} />}
        styles={burgerMenuStyles}
      >
        <errorLogging.ErrorBoundary>
          <Navigation onClick={handleClick} />
        </errorLogging.ErrorBoundary>
      </StyledMenu>
      <StyledContent>
        <errorLogging.ErrorBoundary>
          <Switch>
            <Route exact path="/" render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`} />} />
            <Redirect exact from="/dashboard/reload" to="/dashboard" />
            <Route exact={true} path="/dashboard" component={DashboardRoute} />
            <Route path="/e" component={EntitiesRoute} />
            <Route path="/s" component={Settings} />
            <Route path="/docs" component={DocsRoute} />
            <Route render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`} />} />
          </Switch>
        </errorLogging.ErrorBoundary>
      </StyledContent>
    </>
  )

  const adminForbiddenContent = adminAllowed === false && (
    <StyledContent>
      <ErrorView
        title={<FormattedMessage id={'client.admin.error.no_roles.title'} />}
        message={<FormattedMessage id={'client.admin.error.no_roles.message'} />}
      />
    </StyledContent>
  )

  return (
    <>
      <errorLogging.ErrorBoundary>
        <InvalidSession />
      </errorLogging.ErrorBoundary>
      <LoadMask required={[history !== null]}>
        <Router history={history || {}}>
          <GlobalStyles />
          <notification.Notifications navigationStrategy={navigationStrategy()} />
          <StyledWrapper width={useWindowWidth()}>
            <Header />
            {adminAllowedContent || adminForbiddenContent}
          </StyledWrapper>
        </Router>
      </LoadMask>
    </>
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
  adminAllowed: PropTypes.bool
}

export default withTheme(Admin)
