import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup, stylingInk} from 'tocco-ui'

const ModalButtons = ({buttons}) =>
  <ButtonGroup look="raised">
    {buttons.map((button, i) =>
      <Button
        ink={button.primary ? stylingInk['PRIMARY'] : stylingInk['BASE']}
        key={i}
        label={button.label}
        onClick={button.callback}
      />
    )}
  </ButtonGroup>

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
