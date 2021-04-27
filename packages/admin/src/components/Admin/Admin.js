import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {BurgerButton, LoadMask} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import {withTheme} from 'styled-components'
import {notification} from 'tocco-app-extensions'
import {viewPersistor} from 'tocco-util'

import navigationStrategy from './../../routes/entities/utils/navigationStrategy'
import Navigation from '../Navigation'
import DashboardRoute from '../../routes/dashboard'
import EntitiesRoute from '../../routes/entities'
import DocsRoute from '../../routes/docs'
import Settings from '../../routes/settings'
import Header from '../Header'
import {
  StyledWrapper,
  StyledContent,
  StyledMenu,
  burgerMenuStyles
} from './StyledComponents'

const Admin = ({
  initializeNavigation,
  setMenuOpen,
  menuOpen,
  baseRoute,
  confirm,
  loadPrincipal,
  loadServerSettings,
  theme
}) => {
  const [history, setHistory] = useState(null)

  useEffect(() => {
    initializeHistory()
    initializeNavigation()
    loadPrincipal()
    loadServerSettings()
  }, [])

  const initializeHistory = () => {
    const browserHistory = createBrowserHistory({
      ...baseRoute && {basename: baseRoute},
      getUserConfirmation: (message, confirmCallback) => {
        confirm(
          '',
          message,
          <FormattedMessage id="client.common.ok"/>,
          <FormattedMessage id="client.common.cancel"/>,
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

  return <LoadMask required={[history !== null]}>
    <Router history={history || {}}>
      <notification.Notifications navigationStrategy={navigationStrategy()}/>
      <StyledWrapper id="outer-container">
        <Header/>
        <StyledMenu
          isOpen={menuOpen}
          onStateChange={isMenuOpen}
          customCrossIcon={false}
          customBurgerIcon={<BurgerButton isOpen={menuOpen} size="20" color={theme.colors.paper}/>}
          styles={burgerMenuStyles}
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}>
          <Navigation onClick={() => {
            setMenuOpen(false)
            viewPersistor.clearPersistedViews()
          }}/>
        </StyledMenu>
        <StyledContent id="page-wrap">
          <Switch>
            <Route exact path="/"
              render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
            <Route exact={true} path="/dashboard" component={DashboardRoute}/>
            <Route path="/e" component={EntitiesRoute}/>
            <Route path="/s" component={Settings}/>
            <Route path="/docs" component={DocsRoute}/>
            <Route render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
          </Switch>
        </StyledContent>
      </StyledWrapper>
    </Router>
  </LoadMask>
}

Admin.propTypes = {
  baseRoute: PropTypes.string,
  loggedIn: PropTypes.bool,
  menuOpen: PropTypes.bool,
  loadPrincipal: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  initializeNavigation: PropTypes.func.isRequired,
  loadServerSettings: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme(Admin)
