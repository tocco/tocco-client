import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from '@rebass/grid'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Icon, Button, LoadMask, StyledH1} from 'tocco-ui'
import {notifier} from 'tocco-app-extensions'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {slide as Menu} from 'react-burger-menu'

import Navigation from '../Navigation'
import DashboardRoute from '../../routes/dashboard'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import Login from '../../components/Login'
import {StyledLink} from '../StyledLink'
import fav from './favicon.ico'

const Title = styled(StyledH1)`
 && {
 color: white;
 padding-left: 8px;
 padding-top: 5px;
 font-size: 2.5rem;
 }
`

class Admin extends React.Component {
  history = createBrowserHistory({
    ...this.props.baseRoute && {basename: this.props.baseRoute},
    getUserConfirmation: (message, callback) => {
      this.props.confirm(
        '',
        message,
        <FormattedMessage id="client.common.ok"/>,
        <FormattedMessage id="client.common.cancel"/>,
        () => callback(true), // eslint-disable-line standard/no-callback-literal
        () => callback(false) // eslint-disable-line standard/no-callback-literal
      )
    }
  })

  componentDidMount() {
    this.props.doSessionCheck()
    this.props.initializeNavigation()
  }

  isMenuOpen = state => {
    if (state.isOpen !== this.props.menuOpen) {
      this.props.setMenuOpen(state.isOpen)
    }
  }

  render() {
    return <Router history={this.history}>
      <notifier.Notifier/>
      <Helmet defer={false}>
        <title>Tocco</title>
        <link rel="icon" type="image/png" href={fav} sizes="16x16" />
      </Helmet>
      <LoadMask required={[this.props.loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          {
            !this.props.loggedIn
              ? <div>
                <Login/>
              </div>
              : <div id="outer-container">
                <Flex style={{backgroundColor: '#9E2124', color: '#fff'}}>
                  <Box pl="30px"><StyledLink to="/"><Title>Tocco</Title></StyledLink></Box>
                  <Box ml="auto" pt={9} pr={10}>
                    <Button icon="sign-out-alt" label="Logout" onClick={this.props.doLogout}/>
                  </Box>
                </Flex>
                <Menu isOpen={this.props.menuOpen} onStateChange={this.isMenuOpen}
                  customBurgerIcon={<Icon color="white" icon="bars"/>} styles={menuStyles} pageWrapId={'page-wrap'}
                  outerContainerId={'outer-container'}>
                  <Navigation onClick={() => this.props.setMenuOpen(false)}/>
                </Menu>
                <Flex>
                  <Box id="page-wrap" width={1} bg="#edf1f5">
                    <Switch>
                      <Route exact path="/"
                        render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
                      <Route exact={true} path="/dashboard" component={DashboardRoute}/>
                      <Route path="/e" component={EntitiesRoute}/>
                      <Route path="/s" component={Settings}/>
                      <Route render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
                    </Switch>
                  </Box>
                </Flex>
              </div>

          }
        </div>
      </LoadMask>
    </Router>
  }
}

Admin.propTypes = {
  baseRoute: PropTypes.string,
  loggedIn: PropTypes.bool,
  menuOpen: PropTypes.bool,
  doLogout: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  doSessionCheck: PropTypes.func.isRequired,
  initializeNavigation: PropTypes.func.isRequired
}

export default Admin

const menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '16px',
    height: '16px',
    left: '16px',
    top: '16px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#253653',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    height: '90%'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
