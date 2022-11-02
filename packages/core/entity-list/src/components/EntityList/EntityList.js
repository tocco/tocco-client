import PropTypes from 'prop-types'
import {scrollBehaviourPropType, SidepanelMainContent, Sidepanel, SidepanelContainer} from 'tocco-ui'

import ListViewContainer from '../../containers/ListViewContainer'
import SearchViewContainer from '../../containers/SearchViewContainer'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const EntityList = ({
  searchFormType,
  searchFormCollapsed,
  searchFormPosition,
  scrollBehaviour,
  setSearchFormCollapsed
}) => {
  if (searchFormType === searchFormTypes.NONE) {
    return <ListViewContainer />
  }

  return (
    <SidepanelContainer
      sidepanelPosition={searchFormPosition}
      sidepanelCollapsed={searchFormCollapsed}
      setSidepanelCollapsed={setSearchFormCollapsed}
      scrollBehaviour={scrollBehaviour}
    >
      <Sidepanel>
        <SearchViewContainer />
      </Sidepanel>
      <SidepanelMainContent>
        <ListViewContainer />
      </SidepanelMainContent>
    </SidepanelContainer>
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
