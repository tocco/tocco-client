import React from 'react'
import {Flex, Box} from '@rebass/grid'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import Navigation from '../Navigation'
import Dashboard from '../Dashboard'
import EntitiesRoute from '../EntitiesRoute'
import Settings from '../Settings'

class Admin extends React.Component {
  render() {
    return <Router>
      <div>
        <div style={{backgroundColor: '#9E2124', color: '#fff'}}>
          <h1>Tocco</h1>
        </div>
        <Flex>
          <Box width={1 / 5} px={2} bg="lightgrey">
            <Navigation/>
          </Box>
          <Box width={4 / 5} px={2}>
            <Route exact path="/"render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/dashboard`}/>}/>
            <Route exact={true} path="/dashboard" component={Dashboard} />
            <Route path="/e" component={EntitiesRoute} />
            <Route path="/s" component={Settings} />
          </Box>
        </Flex>
      </div>
    </Router>
  }
}

Admin.propTypes = {

}

export default Admin
