import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'

import './styles.scss'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super(props)
    props.initialize()
  }

  render() {
    return (
      <div className="entity-browser">
        <SearchFormContainer/>
        <ListViewContainer/>
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initialize: React.PropTypes.func.isRequired
}
