import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from '@rebass/grid'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Button, LoadMask} from 'tocco-ui'

import Navigation from '../Navigation'
import DashboardRoute from '../../routes/dashboard'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import Login from '../../components/Login'

class Admin extends React.Component {
  history = createBrowserHistory({...this.props.baseRoute && {basename: this.props.baseRoute}})

  componentDidMount() {
    this.props.doSessionCheck()
  }

  render() {
    return <Router history={this.history}>
      <LoadMask required={[this.props.loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          {
            !this.props.loggedIn
              ? <div>
                <Login/>
              </div>
              : <div>
                <Flex style={{backgroundColor: '#9E2124', color: '#fff'}}>
                  <Box> <h1>Tocco</h1></Box>
                  <Box ml="auto">
                    <Button label="Loggout" onClick={this.props.doLogout}/>
                  </Box>
                </Flex>
                <Flex>
                  <Box width={1 / 5} px={2} bg="lightgrey" >
                    <Navigation/>
                  </Box>
                  <Box width={4 / 5} px={2}>
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
  doSessionCheck: PropTypes.func.isRequired
}

export default Admin
