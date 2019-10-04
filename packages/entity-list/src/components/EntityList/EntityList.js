import PropTypes from 'prop-types'
import React, {useEffect} from 'react'

import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({initialize, searchFormType, searchFormPosition, showSelectionController}) => {
  useEffect(() => {
    initialize()
  }, [])

  const List = () => <React.Fragment>
    {showSelectionController && <SelectionControllerContainer/>}
    <ListViewContainer/>
  </React.Fragment>

  if (searchFormType === searchFormTypes.NONE) {
    return <List/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer>
      <SearchGrid>
        <SearchFormContainer/>
      </SearchGrid>
      <ListGrid>
        <List/>
      </ListGrid>
    </PositioningContainer>
  )
}

EntityList.propTypes = {
  initialize: PropTypes.func.isRequired,
  searchFormType: searchFormTypePropTypes,
  showSelectionController: PropTypes.bool,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
