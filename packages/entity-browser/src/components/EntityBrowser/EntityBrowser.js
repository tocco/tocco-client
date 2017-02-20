import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import DetailViewContainer from '../../containers/DetailViewContainer'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super(props)
    props.initialize()
  }

  render() {
    let content
    if (this.props.showDetailEntityId) {
      content = <DetailViewContainer entityId={this.props.showDetailEntityId}/>
    } else {
      content = (
        <div>
          {this.props.showSearchForm && <SearchFormContainer/>}
          <ListViewContainer/>
        </div>
      )
    }

    return (
      <div className="entity-browser">
        {content}
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initialize: React.PropTypes.func.isRequired,
  showSearchForm: React.PropTypes.bool.isRequired,
  showDetailEntityId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])
}
