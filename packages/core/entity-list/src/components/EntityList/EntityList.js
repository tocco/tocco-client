import PropTypes from 'prop-types'
import {scrollBehaviourPropType, useCollapseOnMobile} from 'tocco-ui'

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
  const [isCollapsed, setIsCollapsed] = useCollapseOnMobile(searchFormCollapsed)
  const getWindowWidth = () => window.innerWidth

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)

    /* only toggle searchFormCollapsed on larger resolutions */
    /* otherwise a double click is needed to reopen collapsed panel on smaller screens */
    if (getWindowWidth() > 768) {
      setSearchFormCollapsed(!isCollapsed)
    }
  }

  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer />
  }

  const PositioningContainer = searchFormPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer
      scrollBehaviour={scrollBehaviour}
      searchFormType={searchFormType}
      isCollapsed={isCollapsed}
      windowWidth={getWindowWidth()}
    >
      <SearchGrid searchFormType={searchFormType} scrollBehaviour={scrollBehaviour}>
        <SearchViewContainer isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
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
