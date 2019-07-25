import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from '@rebass/grid'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Button, LoadMask, StyledH1} from 'tocco-ui'
import {notifier} from 'tocco-app-extensions'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Navigation from '../Navigation'
import DashboardRoute from '../../routes/dashboard'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import Login from '../../components/Login'
import {StyledLink} from '../StyledLink'

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
  }

  render() {
    return <Router history={this.history}>
      <notifier.Notifier/>
      <Helmet>
        <title>Tocco</title>
      </Helmet>
      <LoadMask required={[this.props.loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          {
            !this.props.loggedIn
              ? <div>
                <Login/>
              </div>
              : <div>
                <Flex style={{backgroundColor: '#9E2124', color: '#fff'}}>
                  <Box><StyledLink to="/"><Title>Tocco</Title></StyledLink></Box>
                  <Box ml="auto" pt={9} pr={10}>
                    <Button icon="sign-out-alt" label="Loggout" onClick={this.props.doLogout}/>
                  </Box>
                </Flex>
                <Flex>
                  <Box width={1 / 7} px={2} bg="#F5F5F5" >
                    <Navigation/>
                  </Box>
                  <Box width={6 / 7} px={10}>
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
  doLogout: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  doSessionCheck: PropTypes.func.isRequired
}

export default Admin
