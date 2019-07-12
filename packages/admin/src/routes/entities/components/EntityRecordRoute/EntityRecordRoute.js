/* eslint-disable max-len */
import React from 'react'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import Entity from '../../subroutes/entity'
import Relations from '../../subroutes/relations'
import Detail from '../../subroutes/detail'

const Spacer = () => <span style={{paddingLeft: '5px'}}/>

function wordCount(str, word) {
  return str.split(word).length - 1
}

const EntityRecordRoute = ({match}) => {
  const count = wordCount(match.path, ':relation')

  return (
    <div>
      <Route exact path={[`${match.path}/edit`, `${match.path}/relations`]} render={() =>
        <div>
          <Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/edit`}>edit</NavLink><Spacer/>
          |<Spacer/><NavLink activeStyle={{fontWeight: 'bold'}} to={`${match.url}/relations`}>relations</NavLink>
        </div>} />

      <Switch>
        <Route exact path={`${match.url}`} render={({match}) => <Redirect to={`${match.url.replace(/\/$/, '')}/edit`}/>}/>
        <Route path={`${match.path}/edit`} component={Detail}/>
        <Route path={`${match.path}/relations`} component={Relations}/>
        <Route path={`${match.path}/:relation_${count}`} component={Entity}/>
      </Switch>
    </div>
  )
}

EntityRecordRoute.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityRecordRoute
