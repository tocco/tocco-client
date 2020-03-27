import React from 'react'
import PropTypes from 'prop-types'
import {Button, design, scale} from 'tocco-ui'
import styled from 'styled-components'

const StyledModalButton = styled(Button)`
  margin-bottom: ${scale.space(0)};
`

const ModalButtons = ({buttons}) =>
  buttons.map((button, i) =>
    <StyledModalButton
      {...(button.primary ? {ink: design.ink.PRIMARY} : {})}
      key={i}
      label={button.label}
      onClick={button.callback}
    />
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
