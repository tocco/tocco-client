import PropTypes from 'prop-types'
import React, {useContext, useMemo} from 'react'

import {scrollBehaviourPropType} from '../Table'
import {useCollapseOnMobile} from '../utilStyles'

export const SidepanelPosition = {
  top: 'top',
  left: 'left'
}

const defaultValue = {
  sidepanelPosition: SidepanelPosition.left,
  isCollapsed: false,
  toggleCollapse: () => {},
  scrollBehaviour: 'none'
}
const SidepanelContext = React.createContext(defaultValue)

const SidepanelContextProvider = ({
  children,
  sidepanelPosition = SidepanelPosition.top,
  sidepanelCollapsed = false,
  setSidepanelCollapsed = () => {},
  scrollBehaviour = 'none'
}) => {
  const {isCollapsed, toggleCollapse} = useCollapseOnMobile(sidepanelCollapsed, setSidepanelCollapsed)

  const value = useMemo(
    () => ({
      sidepanelPosition,
      isCollapsed: sidepanelPosition === SidepanelPosition.left ? isCollapsed : false,
      toggleCollapse,
      scrollBehaviour
    }),
    [isCollapsed, toggleCollapse, sidepanelPosition, scrollBehaviour]
  )
  return <SidepanelContext.Provider value={value}>{children}</SidepanelContext.Provider>
}

SidepanelContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
  sidepanelPosition: PropTypes.oneOf([SidepanelPosition.top, SidepanelPosition.left]),
  sidepanelCollapsed: PropTypes.bool,
  setSidepanelCollapsed: PropTypes.func,
  scrollBehaviour: scrollBehaviourPropType
}

export const useSidepanelContext = () => useContext(SidepanelContext)

export default SidepanelContextProvider
