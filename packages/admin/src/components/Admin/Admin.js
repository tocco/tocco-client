import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Icon, Button, LoadMask} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import Navigation from '../Navigation'
import DashboardRoute from '../../routes/dashboard'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import Actions from '../../routes/actions'
import {
  StyledWrapper,
  StyledHeader,
  StyledConfig,
  StyledContent,
  StyledMenu,
  burgerMenuStyles
} from './StyledComponents'

const Admin = ({initializeNavigation, setMenuOpen, menuOpen, baseRoute, confirm, doLogout, clearPersistedViews}) => {
  const [history, setHistory] = useState(null)

  useEffect(() => {
    initializeHistory()
    initializeNavigation()
  }, [])

  const initializeHistory = () => {
    const browserHistory = createBrowserHistory({
      ...baseRoute && {basename: baseRoute},
      getUserConfirmation: (message, callback) => {
        confirm(
          '',
          message,
          <FormattedMessage id="client.common.ok"/>,
          <FormattedMessage id="client.common.cancel"/>,
          () => callback(true), // eslint-disable-line standard/no-callback-literal
          () => callback(false) // eslint-disable-line standard/no-callback-literal
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

  return (
    <LoadMask required={[history !== null]}>
      <Router history={history || {}}>
        <StyledWrapper id="outer-container">
          <StyledHeader>
            <StyledConfig>
              <div><Button look="raised" icon="sign-out-alt" label="Logout" onClick={doLogout}/></div>
            </StyledConfig>
          </StyledHeader>
          <StyledMenu isOpen={menuOpen} onStateChange={isMenuOpen} customCrossIcon={ false }
            customBurgerIcon={menuOpen ? <Icon icon="times"/> : <Icon icon="bars"/>}
            styles={burgerMenuStyles}
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}>
            <Navigation onClick={() => {
              setMenuOpen(false)
              clearPersistedViews()
            }}/>
          </StyledMenu>
          <StyledContent id="page-wrap">
            <Switch>
              <Route exact path="/"
                render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
              <Route exact={true} path="/dashboard" component={DashboardRoute}/>
              <Route path="/e" component={EntitiesRoute}/>
              <Route path="/s" component={Settings}/>
              <Route path="/a" component={Actions}/>
              <Route render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
            </Switch>
          </StyledContent>
        </StyledWrapper>
      </Router>
    </LoadMask>
  )
}

Admin.propTypes = {
  baseRoute: PropTypes.string,
  loggedIn: PropTypes.bool,
  menuOpen: PropTypes.bool,
  doLogout: PropTypes.func.isRequired,
  clearPersistedViews: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  initializeNavigation: PropTypes.func.isRequired
}

export default Admin
