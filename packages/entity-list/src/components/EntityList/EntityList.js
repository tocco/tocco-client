import PropTypes from 'prop-types'
import React from 'react'

import ListViewContainer from '../../containers/ListViewContainer'
import SearchViewContainer from '../../containers/SearchViewContainer'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'

const EntityList = ({searchFormType, searchFormCollapsed, searchFormPosition, setSearchFormCollapsed}) => {
  const toggleCollapse = () => {
    setSearchFormCollapsed(!searchFormCollapsed)
  }

  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer />
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer searchFormType={searchFormType} isCollapsed={searchFormCollapsed}>
      <SearchGrid>
        <SearchViewContainer isCollapsed={searchFormCollapsed} toggleCollapse={toggleCollapse} />
      </SearchGrid>
      <ListGrid searchFormType={searchFormType}>
        <ListViewContainer />
      </ListGrid>
    </PositioningContainer>
  )
}

EntityList.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left']),
  searchFormCollapsed: PropTypes.bool,
  setSearchFormCollapsed: PropTypes.func
}

export default EntityList
