import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'

import {StyledBurgerButton} from './StyledComponents'

const BurgerButton = ({isOpen, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledBurgerButton isOpen={isOpen} aria-label={msg('client.component.burgerButton.Label')}>
      <span />
      <span />
      <span />
    </StyledBurgerButton>
  )
}

BurgerButton.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool
}

export default injectIntl(BurgerButton)
