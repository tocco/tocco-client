import PropTypes from 'prop-types'

import {SidepanelPosition, useSidepanelContext} from './SidepanelContext'
import {
  StyledSidepanel,
  StyledSidepanelCollapsed,
  StyledSidepanelContent,
  StyledSidepanelLeftContentWrapper,
  StyledSidepanelTopContentWrapper,
  StyledToggleCollapseButton
} from './StyledComponents'

const Sidepanel = ({children}) => {
  const {sidepanelPosition, isCollapsed, toggleCollapse, scrollBehaviour} = useSidepanelContext()

  const ContentWrapper =
    sidepanelPosition === SidepanelPosition.left ? StyledSidepanelLeftContentWrapper : StyledSidepanelTopContentWrapper

  return (
    <StyledSidepanel sidepanelPosition={sidepanelPosition} scrollBehaviour={scrollBehaviour}>
      <ContentWrapper>
        <StyledSidepanelContent isCollapsed={isCollapsed}>{children}</StyledSidepanelContent>
        {sidepanelPosition === 'left' && (
          <StyledSidepanelCollapsed onClick={toggleCollapse} isCollapsed={isCollapsed}>
            <StyledToggleCollapseButton icon="chevron-right" isCollapsed={isCollapsed} />
          </StyledSidepanelCollapsed>
        )}
      </ContentWrapper>
    </StyledSidepanel>
  )
}

Sidepanel.propTypes = {
  children: PropTypes.any
}

export default Sidepanel
