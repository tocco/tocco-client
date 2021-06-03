import PropTypes from 'prop-types'
import React, {useState} from 'react'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({
  searchFormType,
  searchFormPosition
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer searchFormType={searchFormType} isCollapsed={isCollapsed}>
      <SearchGrid>
        <SearchViewContainer isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}/>
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
