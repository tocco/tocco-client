import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from '@rebass/grid'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {Button, LoadMask} from 'tocco-ui'

import Navigation from '../Navigation'
import Dashboard from '../Dashboard'
import EntitiesRoute from '../EntitiesRoute'
import Settings from '../Settings'
import LoginContainer from '../../containers/LoginContainer'

class Admin extends React.Component {
  componentDidMount() {
    this.props.doSessionCheck()
  }

  render() {
    return <Router {...this.props.baseRoute && {basename: this.props.baseRoute}}>
      <LoadMask required={[this.props.loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          {
            !this.props.loggedIn
              ? <div>
                <LoginContainer/>
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
                      <Route exact={true} path="/dashboard" component={Dashboard}/>
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
