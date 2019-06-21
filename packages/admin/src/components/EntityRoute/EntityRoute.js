import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import EntityRecordRoute from '../EntityRecordRoute'
import DetailEditView from '../DetailEditView'
import ListViewContainer from '../../containers/ListViewContainer'

const Spacer = () => <span style={{paddingLeft: '5px'}}/>

const EntityRoute = ({match}) => {
  return (
    <div>
      <div>
        <Route exact path={[`${match.path}/list`, `${match.path}/create`]} render={() =>
          <div>
            <Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/list`}>List</NavLink><Spacer/>
          |<Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/create`}>New</NavLink>
          </div>} />
        <Switch>
          <Route exact path={match.url} render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/list`}/>}/>
          <Route path={`${match.path}/list`} component={ListViewContainer}/>
          <Route path={`${match.path}/create`} component={DetailEditView}/>
          <Route path={`${match.path}/:key`} component={EntityRecordRoute}/>
        </Switch>
      </div>
    </div>
  )
}

EntityRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRoute
