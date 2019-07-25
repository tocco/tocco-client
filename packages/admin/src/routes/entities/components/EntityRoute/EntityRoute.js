import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route, Switch} from 'react-router-dom'

import Record from '../../subroutes/record'
import Create from '../../subroutes/create'
import List from '../../subroutes/list'
import {StyledNavLink} from '../../../../components/StyledLink'

const Spacer = () => <span style={{paddingLeft: '5px'}}/>

const EntityRoute = ({match}) => {
  return (
    <div>
      <div>
        <Route exact path={[`${match.path}/list`, `${match.path}/create`]} render={() =>
          <div>
            <Spacer/><StyledNavLink to={`${match.url}/list`}>List</StyledNavLink><Spacer/>
          |<Spacer/><StyledNavLink to={`${match.url}/create`}>New</StyledNavLink>
          </div>} />
        <Switch>
          <Route exact path={match.url} render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/list`}/>}/>
          <Route path={`${match.path}/list`} component={List}/>
          <Route path={`${match.path}/create`} component={Create}/>
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
