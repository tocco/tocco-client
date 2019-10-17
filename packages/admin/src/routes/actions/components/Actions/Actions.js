import React from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import {Typography} from 'tocco-ui'

import ResourceScheduler from '../ResourceScheduler'

const Actions = ({match}) => {
  return <Switch>
    <Route path={`${match.path}/resourcescheduler`} component={ResourceScheduler}/>
    <Route component={() => <Typography.H1>404</Typography.H1>}/>
  </Switch>
}

Actions.propTypes = {
  match: PropTypes.object.isRequired
}

export default Actions
