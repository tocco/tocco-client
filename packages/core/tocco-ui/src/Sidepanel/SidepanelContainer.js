import PropTypes from 'prop-types'

import {scrollBehaviourPropType} from '../Table'
import SidepanelContextProvider, {SidepanelPosition} from './SidepanelContext'
import SidepanelPositionContainer from './SidepanelPositionContainer'

const SidepanelContainer = ({
  children,
  sidepanelPosition,
  sidepanelCollapsed,
  setSidepanelCollapsed,
  scrollBehaviour
}) => (
  <SidepanelContextProvider
    sidepanelPosition={sidepanelPosition}
    sidepanelCollapsed={sidepanelCollapsed}
    setSidepanelCollapsed={setSidepanelCollapsed}
    scrollBehaviour={scrollBehaviour}
  >
    <SidepanelPositionContainer>{children}</SidepanelPositionContainer>
  </SidepanelContextProvider>
)

SidepanelContainer.propTypes = {
  children: PropTypes.any,
  sidepanelPosition: PropTypes.oneOf([SidepanelPosition.top, SidepanelPosition.left]),
  sidepanelCollapsed: PropTypes.bool,
  setSidepanelCollapsed: PropTypes.func,
  scrollBehaviour: scrollBehaviourPropType
}

export default SidepanelContainer
