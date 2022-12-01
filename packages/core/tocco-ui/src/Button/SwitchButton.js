import PropTypes from 'prop-types'

import {StyledSwitch, StyledSwitchInput, StyledSwitchLabel} from './StyledSwitchButton'

const SwitchButton = ({checked, onChange}) => {
  return (
    <StyledSwitchLabel>
      <StyledSwitchInput checked={checked} type="checkbox" onChange={onChange} />
      <StyledSwitch />
    </StyledSwitchLabel>
  )
}

SwitchButton.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default SwitchButton
