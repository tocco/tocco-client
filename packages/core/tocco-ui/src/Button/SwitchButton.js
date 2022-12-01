import PropTypes from 'prop-types'

import {StyledSwitch, StyledSwitchInput, StyledSwitchLabel} from './StyledSwitchButton'

// TODO: PropTypes
const SwitchButton = ({checked, onChange}) => {
  return (
    <StyledSwitchLabel>
      <StyledSwitchInput checked={checked} type="checkbox" onChange={onChange} />
      <StyledSwitch />
    </StyledSwitchLabel>
  )
}

SwitchButton.propTypes = {
  checked: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SwitchButton
