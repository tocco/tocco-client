import PropTypes from 'prop-types'

import {useSidepanelContext} from './SidepanelContext'
import {StyledSidepanelHeader, StyledToggleCollapseButton} from './StyledComponents'

const SidepanelHeader = ({children}) => {
  const {sidepanelPosition, isCollapsed, toggleCollapse} = useSidepanelContext()

  if (sidepanelPosition !== 'left') {
    return null
  }

  return (
    <StyledSidepanelHeader>
      <StyledToggleCollapseButton icon="chevron-left" isCollapsed={isCollapsed} onClick={toggleCollapse} />
      {children}
    </StyledSidepanelHeader>
  )
}

SidepanelHeader.propTypes = {
  children: PropTypes.any
}

export default SidepanelHeader
