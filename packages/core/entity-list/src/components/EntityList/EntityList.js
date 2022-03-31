import PropTypes from 'prop-types'
import {scrollBehaviourPropType} from 'tocco-ui'

import ListViewContainer from '../../containers/ListViewContainer'
import SearchViewContainer from '../../containers/SearchViewContainer'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'
import {TopPositioning, LeftPositioning, ListGrid, SearchGrid} from './StyledComponents'

const EntityList = ({
  searchFormType,
  searchFormCollapsed,
  searchFormPosition,
  scrollBehaviour,
  setSearchFormCollapsed
}) => {
  const toggleCollapse = () => {
    setSearchFormCollapsed(!searchFormCollapsed)
  }

  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer />
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer
      scrollBehaviour={scrollBehaviour}
      searchFormType={searchFormType}
      isCollapsed={searchFormCollapsed}
    >
      <SearchGrid searchFormType={searchFormType} scrollBehaviour={scrollBehaviour}>
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
  scrollBehaviour: scrollBehaviourPropType,
  setSearchFormCollapsed: PropTypes.func
}

export default EntityList
