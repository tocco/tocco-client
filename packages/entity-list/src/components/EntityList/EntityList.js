import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import styled from 'styled-components'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const StyledListWrapper = styled.div`
  margin-right: 2rem;
`

const EntityList = ({
  initialize,
  initializeSearchForm,
  searchFormType,
  searchFormPosition
}) => {
  useEffect(() => {
    initialize()
    initializeSearchForm()
  }, [])

  const List = () => (
    <StyledListWrapper className="StyledListWrapper">
      <ListViewContainer/>
    </StyledListWrapper>
  )

  if (searchFormType === searchFormTypes.NONE) {
    return <List/>
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer>
      <SearchGrid>
        <SearchViewContainer/>
      </SearchGrid>
      <ListGrid>
        <List/>
      </ListGrid>
    </PositioningContainer>
  )
}

EntityList.propTypes = {
  initialize: PropTypes.func.isRequired,
  initializeSearchForm: PropTypes.func.isRequired,
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
