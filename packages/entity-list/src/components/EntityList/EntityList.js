import PropTypes from 'prop-types'
import React from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {TopContainer, LeftContainer, ListContainer, SearchContainer} from './StyledComponents'

class EntityList extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
    this.props.initializeSearchForm(this.props.showSearchForm)
  }

  render() {
    const Container = this.props.searchFormPosition === 'left' ? LeftContainer : TopContainer

    return (
      <Container>
        {this.props.showSearchForm
       && <SearchContainer>
         {this.props.showFullTextSearchForm ? <FullTextSearchForm/> : <SearchFormContainer/>}
       </SearchContainer> }
        <ListContainer>
          {this.props.showSelectionController && <SelectionControllerContainer/>}
          <ListViewContainer/>
        </ListContainer>
      </Container>
    )
  }
}

EntityList.propTypes = {
  initialize: PropTypes.func.isRequired,
  initializeSearchForm: PropTypes.func.isRequired,
  showSearchForm: PropTypes.bool,
  showFullTextSearchForm: PropTypes.bool,
  showSelectionController: PropTypes.bool,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
