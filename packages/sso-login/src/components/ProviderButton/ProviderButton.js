import React from 'react'
import {Icon} from 'tocco-ui'
import PropTypes from 'prop-types'

import {openLoginWindow} from '../../utils/loginWindow'
import StyledProviderButton from './StyledProviderButton'

const ProviderButton = ({provider, loginCompleted, loginEndpoint}) => {
  const clickHandler = () => {
    openLoginWindow(loginEndpoint, loginCompleted, provider)
  }

  return (
    <StyledProviderButton
      primaryColor={provider.button_primary_color}
      secondaryColor={provider.button_secondary_color}
      onClick={clickHandler}
    >
      {provider.button_icon && <Icon position="prepend" icon={provider.button_icon}/>}
      <span>{provider.button_label}</span>
    </StyledProviderButton>
  )
}

ProviderButton.propTypes = {
  provider: PropTypes.shape({
    button_primary_color: PropTypes.string,
    button_secondary_color: PropTypes.string,
    button_icon: PropTypes.string,
    button_label: PropTypes.string
  }),
  loginEndpoint: PropTypes.string.isRequired,
  loginCompleted: PropTypes.func.isRequired
}

export default ProviderButton
