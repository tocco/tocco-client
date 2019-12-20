import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import styled from 'styled-components'

import SearchViewContainer from '../../containers/SearchViewContainer'
import ListViewContainer from '../../containers/ListViewContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const StyledListWrapper = styled.div`
  background-color: white;
  padding: 1rem 2rem 1.5rem 2rem;
  margin-right: 2rem;
`

const EntityList = ({
  initialize,
  initializeSearchForm,
  searchFormType,
  searchFormPosition,
  showSelectionController
}) => {
  useEffect(() => {
    initialize()
    initializeSearchForm()
  }, [])

  const List = () => <>
    <StyledListWrapper className={'StyledListWrapper'}>
      {showSelectionController && <SelectionControllerContainer/>}
      <ListViewContainer/>
    </StyledListWrapper>
  </>

  if (searchFormType === searchFormTypes.NONE) return <List/>

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
  showSelectionController: PropTypes.bool,
  searchFormPosition: PropTypes.oneOf(['top', 'left'])
}

export default EntityList
