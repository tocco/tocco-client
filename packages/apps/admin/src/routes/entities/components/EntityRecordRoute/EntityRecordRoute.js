/* eslint-disable max-len */
import PropTypes from 'prop-types'
import {Redirect, Route, Switch} from 'react-router-dom'

import Action from '../../subroutes/action'
import Detail from '../../subroutes/detail'
import Edit from '../../subroutes/edit'
import Entity from '../../subroutes/entity'
import Relations from '../../subroutes/relations'

function wordCount(str, word) {
  return str.split(word).length - 1
}

const EntityRecordRoute = ({match}) => {
  const count = wordCount(match.path, ':relation')

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={props => <Redirect to={`${props.match.url.replace(/\/$/, '')}/detail`} />}
      />
      <Route path={`${match.path}/detail`} component={Detail} />
      <Route path={`${match.path}/edit`} component={Edit} />
      <Route path={`${match.path}/relations`} component={Relations} />
      <Route path={`${match.path}/action`} component={Action} />
      <Route path={`${match.path}/:relation_${count}`} component={Entity} />
    </Switch>
  )
}

EntityRecordRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRecordRoute
