/* eslint-disable max-len */
import React from 'react'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import EntityDetailRoute from '../EntityDetailRoute'
import RelationsView from '../RelationsView'
import DetailEditView from '../DetailEditView'

const Spacer = () => <span style={{paddingLeft: '5px'}}/>

const EntityRecordRoute = ({match}) => {
  return (
    <div>
      <NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/overview`}>overview</NavLink><Spacer/>
      |<Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/edit`}>edit</NavLink><Spacer/>
      |<Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/relations`}>relations</NavLink>
      <Switch>
        <Route exact path={`${match.url}`} render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/overview`}/>}/>
        <Route path={`${match.path}/overview`} render={({match}) => <div>Entity Overview {JSON.stringify(match)}</div>}/>
        <Route path={`${match.path}/edit`} component={DetailEditView}/>
        <Route path={`${match.path}/relations`} component={RelationsView}/>
        <Route path={`${match.path}/:relation`} component={EntityDetailRoute}/>
      </Switch>
    </div>
  )
}

EntityRecordRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRecordRoute
