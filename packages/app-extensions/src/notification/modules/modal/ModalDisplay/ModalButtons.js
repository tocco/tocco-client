import PropTypes from 'prop-types'
import React from 'react'
import {design} from 'tocco-ui'

import {StyledModalButton, StyledModalButtonWrapper} from './StyledComponents'

const ModalButtons = ({buttons}) => (
  <StyledModalButtonWrapper>
    {buttons.map((button, i) => <StyledModalButton
      {...(button.primary ? {ink: design.ink.PRIMARY} : {})}
      key={i}
      label={button.label}
      onClick={button.callback}
    />
    )}
  </StyledModalButtonWrapper>
)

ModalButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
      primary: PropTypes.bool,
      callback: PropTypes.func.isRequired
    })
  )
}

export default ModalButtons
