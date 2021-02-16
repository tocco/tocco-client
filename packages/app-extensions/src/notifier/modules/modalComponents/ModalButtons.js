import React from 'react'
import PropTypes from 'prop-types'
import {design} from 'tocco-ui'

import {StyledModalButtonWrapper, StyledModalButton} from './StyledComponents'

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
      label: PropTypes.string.isRequired,
      primary: PropTypes.bool,
      callback: PropTypes.func.isRequired
    })
  )
}

export default ModalButtons
