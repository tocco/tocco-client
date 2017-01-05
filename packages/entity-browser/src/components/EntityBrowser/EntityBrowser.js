import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'

import './styles.scss'

export const EntityBrowser = props => {
  props.initialize()

  return (
    <div className="entity-browser">
      <SearchFormContainer/>
      <ListViewContainer/>
    </div>
  )
}

EntityBrowser.propTypes = {
  initialize: React.PropTypes.func.isRequired
}
