import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import Record from '../../subroutes/record'
import Detail from '../../subroutes/detail'
import List from '../../subroutes/list'

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
          <Route path={`${match.path}/list`} component={List}/>
          <Route path={`${match.path}/create`} component={Detail}/>
          <Route path={`${match.path}/:key`} component={Record}/>
        </Switch>
      </div>
    </div>
  )
}

EntityRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRoute
