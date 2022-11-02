import PropTypes from 'prop-types'

import {useSidepanelContext} from './SidepanelContext'
import {LeftPositioning, TopPositioning} from './StyledComponents'

const getWindowWidth = () => window.innerWidth

const SidepanelPositionContainer = ({children}) => {
  const {sidepanelPosition, isCollapsed} = useSidepanelContext()
  const PositioningContainer = sidepanelPosition === 'left' ? LeftPositioning : TopPositioning

  return (
    <PositioningContainer windowWidth={getWindowWidth()} isCollapsed={isCollapsed}>
      {children}
    </PositioningContainer>
  )
}

SidepanelPositionContainer.propTypes = {
  children: PropTypes.any
}

export default SidepanelPositionContainer
