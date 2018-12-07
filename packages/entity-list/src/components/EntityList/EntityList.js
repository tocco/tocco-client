import PropTypes from 'prop-types'
import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'

class EntityList extends React.Component {
  componentWillMount() {
    this.props.initialize()
    this.props.initializeSearchForm(this.props.showSearchForm)
  }

  render() {
    return (
      <div className="entity-list">
        {
          this.props.showSearchForm
          && (this.props.showFullTextSearchForm ? <FullTextSearchForm/> : <SearchFormContainer/>)
        }
        {
          this.props.showSelectionController
          && <div style={{float: 'right'}}><SelectionControllerContainer/></div>
        }
        <ListViewContainer/>
      </div>
    )
  }
}

EntityList.propTypes = {
  initialize: PropTypes.func.isRequired,
  initializeSearchForm: PropTypes.func.isRequired,
  showSearchForm: PropTypes.bool,
  showFullTextSearchForm: PropTypes.bool,
  showSelectionController: PropTypes.bool
}

export default EntityList
