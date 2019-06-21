import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import EntitiesOverview from '../EntitiesOverview'
import EntityRoute from '../EntityRoute'

const EntitiesRoute = ({match}) => {
  return (
    <div>
      <div>Breadcrumps comming soon...</div>
      <Switch>

        <Route path={`${match.url}/:entity`} component={EntityRoute}/>
        <Route exact path={match.url} component={EntitiesOverview}/>
      </Switch>
    </div>
  )
}

EntitiesRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntitiesRoute
