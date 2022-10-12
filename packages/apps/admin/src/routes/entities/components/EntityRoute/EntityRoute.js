import PropTypes from 'prop-types'
import {Redirect, Route, Switch} from 'react-router-dom'

import Action from '../../subroutes/action'
import Create from '../../subroutes/create'
import List from '../../subroutes/list'
import Record from '../../subroutes/record'

const EntityRoute = ({match}) => (
  <Switch>
    <Route exact path={match.url} render={props => <Redirect to={`${props.match.url.replace(/\/$/, '')}/list`} />} />
    <Route path={`${match.path}/action/:id`} component={Action} />
    <Route path={`${match.path}/list`} component={List} />
    <Route path={`${match.path}/create`} component={Create} />
    <Route path={`${match.path}/:key`} component={Record} />
  </Switch>
)

EntityRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRoute
