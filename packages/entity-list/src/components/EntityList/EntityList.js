import PropTypes from 'prop-types'
import React from 'react'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({
  searchFormType,
  searchFormCollapsed,
  searchFormPosition,
  setSearchFormCollapsed
}) => {
  const toggleCollapse = () => {
    setSearchFormCollapsed(!searchFormCollapsed)
  }

  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer searchFormType={searchFormType} isCollapsed={searchFormCollapsed}>
      <SearchGrid>
        <SearchViewContainer isCollapsed={searchFormCollapsed} toggleCollapse={toggleCollapse}/>
      </SearchGrid>
      <ListGrid searchFormType={searchFormType}>
        <ListViewContainer/>
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
