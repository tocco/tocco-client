import PropTypes from 'prop-types'
import React, {useEffect} from 'react'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({
  initialize,
  initializeSearchForm,
  searchFormType,
  searchFormPosition,
  loadPreferences
}) => {
  useEffect(() => {
    initialize()
    initializeSearchForm()
    loadPreferences()
  }, [])

  const List = () => (
    <ListViewContainer/>
  )

  if (searchFormType === searchFormTypes.NONE) {
    return <List/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer searchFormType={searchFormType}>
      <SearchGrid>
        <SearchViewContainer/>
      </SearchGrid>
      <ListGrid searchFormType={searchFormType}>
        <List/>
      </ListGrid>
    </PositioningContainer>
  )
}

EntityList.propTypes = {
  initialize: PropTypes.func.isRequired,
  initializeSearchForm: PropTypes.func.isRequired,
  loadPreferences: PropTypes.func.isRequired,
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
