import React from 'react'
import {Icon} from 'tocco-ui'
import PropTypes from 'prop-types'

import {getPopUpFeatures} from '../../utils/popUp'
import StyledProviderButton from './StyledProviderButton'

const ProviderButton = ({provider, loginCompleted, loginEndpoint}) => {
  const clickHandler = () => {
    const baseUrl = __DEV__ ? '' : __BACKEND_URL__
    const encodedWindowUrl = encodeURIComponent(window.location.href)
    const url = `${baseUrl}${loginEndpoint}?provider=${provider.unique_id}&sourceUri=${encodedWindowUrl}`

    const popUp = window.open(url, provider.label, getPopUpFeatures(650, 500))

    window.ssoPopUpCallback = result => {
      popUp.close()
      loginCompleted(result)
    }
  }

  return (
    <StyledProviderButton
      primaryColor={provider.button_primary_color}
      secondaryColor={provider.button_secondary_color}
      onClick={clickHandler}
    >
      {provider.button_icon && <Icon position="prepend" icon={provider.button_icon}/>}
      {provider.button_label}
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
