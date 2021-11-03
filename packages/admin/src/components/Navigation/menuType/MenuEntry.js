import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import {StyledMenuEntry, StyledTogglerIconWrapper} from './StyledComponents'
import {getMenuPreferencesKey} from '../../../utils/navigationUtils'

const MenuEntry = props => {
  const {item, isOpen, canCollapse, preferencesPrefix, menuTreePath, saveUserPreferences} = props

  const toggleMenyEntryCollapsed = () => {
    saveUserPreferences({[getMenuPreferencesKey(preferencesPrefix, menuTreePath)]: isOpen})
  }

  return (
    <StyledMenuEntry
      {...(canCollapse ? {onClick: toggleMenyEntryCollapsed} : {})}
    >
      <span>{item.label}</span>
      {canCollapse && (
        <StyledTogglerIconWrapper>
          <Icon
            icon={isOpen ? 'chevron-up' : 'chevron-down'}
            onClick={toggleMenyEntryCollapsed}
          />
        </StyledTogglerIconWrapper>)}
    </StyledMenuEntry>
  )
}

MenuEntry.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  canCollapse: PropTypes.bool.isRequired,
  saveUserPreferences: PropTypes.func.isRequired,
  menuTreePath: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  preferencesPrefix: PropTypes.string
}

export default MenuEntry
