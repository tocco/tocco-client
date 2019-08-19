import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import SearchFormContainer from '../../containers/SearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'

const SearchFormWrapper = styled.div`
 margin-bottom: 12px;
`

class EntityList extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
    this.props.initializeSearchForm(this.props.showSearchForm)
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.showSearchForm
          && <SearchFormWrapper>
            {this.props.showFullTextSearchForm ? <FullTextSearchForm/> : <SearchFormContainer/>}
          </SearchFormWrapper>
        }

        {
          this.props.showSelectionController
          && <SelectionControllerContainer/>
        }
        <ListViewContainer/>
      </React.Fragment>
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
