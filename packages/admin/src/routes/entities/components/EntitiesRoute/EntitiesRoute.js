import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import Overview from '../../subroutes/overview'
import Entity from '../../subroutes/entity'
import Breadcrumbs from '../Breadcrumbs'

const EntitiesRoute = ({match, history, loadCurrentViewInfo, currentViewInfo}) => {
  useEffect(() => { loadCurrentViewInfo(history.location.pathname) }, [])

  return (
    <div>
      <Breadcrumbs/>

      <Switch>
        <Route
          path={`${match.url}/:entity`}
          component={Entity}
        />
        <Route exact path={match.url} component={Overview}/>
      </Switch>
    </div>
  )
}

EntitiesRoute.propTypes = {
  loadCurrentViewInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object
}

export default EntitiesRoute
