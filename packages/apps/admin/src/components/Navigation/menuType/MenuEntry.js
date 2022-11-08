import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import {getMenuPreferencesKey} from '../../../utils/navigationUtils'
import {StyledMenuEntry, StyledMenuIconWrapper, StyledTogglerButton} from './StyledComponents'

const MenuEntry = props => {
  const {item, isOpen, canCollapse, preferencesPrefix, menuTreePath, saveUserPreferences} = props
  const {icon, label} = item

  const toggleMenuEntryCollapsed = () =>
    saveUserPreferences({[getMenuPreferencesKey(preferencesPrefix, menuTreePath)]: isOpen})

  return (
    <StyledMenuEntry {...(canCollapse ? {onClick: toggleMenuEntryCollapsed} : {})}>
      <span>
        {icon && (
          <StyledMenuIconWrapper>
            <Icon icon={icon} />
          </StyledMenuIconWrapper>
        )}
        {label}
      </span>
      {canCollapse && (
        <StyledTogglerButton onClick={toggleMenuEntryCollapsed}>
          <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} />
        </StyledTogglerButton>
      )}
    </StyledMenuEntry>
  )
}

MenuEntry.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
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
