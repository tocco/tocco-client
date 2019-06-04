import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import EntityRecordRoute from '../EntityRecordRoute'
import ListView from '../ListView'
import EntityDashboard from '../EntityDashboard'
import DetailEditView from '../DetailEditView'

const EntityDetailRoute = ({match}) => {
  return (
    <div>
      <div>
        <NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/dashboard`}>Dashboard</NavLink>&nbsp;
        | <NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/list`}>List</NavLink>&nbsp;
        | <NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/create`}>New</NavLink>
        <Switch>
          <Route exact path={match.url} render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/list`}/>}/>
          <Route path={`${match.path}/dashboard`} component={EntityDashboard}/>
          <Route path={`${match.path}/list`} component={ListView}/>
          <Route path={`${match.path}/create`} component={DetailEditView}/>
          <Route path={`${match.path}/:key`} component={EntityRecordRoute}/>
        </Switch>
      </div>
    </div>
  )
}

EntityDetailRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityDetailRoute
