import PropTypes from 'prop-types'
import React from 'react'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({
  searchFormType,
  searchFormPosition
}) => {
  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer searchFormType={searchFormType}>
      <SearchGrid>
        <SearchViewContainer/>
      </SearchGrid>
      <ListGrid searchFormType={searchFormType}>
        <ListViewContainer/>
      </ListGrid>
    </PositioningContainer>
  )
}

EntityList.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
