import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import DetailViewContainer from '../../containers/DetailViewContainer'

import './styles.scss'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super(props)
    props.initialize()
  }

  render() {
    let content
    if (this.props.showDetailRecordId) {
      content = <DetailViewContainer recordId={this.props.showDetailRecordId}/>
    } else {
      content = (
        <div>
          <SearchFormContainer/>
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
  showDetailRecordId: React.PropTypes.number
}
