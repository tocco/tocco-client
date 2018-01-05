import React from 'react'
import propTypes from 'prop-types'
import ModalContent from './ModalContent'

const ModalDisplay = props => {
  return (
    <div>
      {props.modal
      && <ModalContent
        id={props.modal.id}
        title={props.modal.title}
        message={props.modal.message}
        component={props.modal.component}
        close={props.close}
      />}
    </div>
  )
}

ModalDisplay.propTypes = {
  modal: propTypes.object,
  close: propTypes.func
}

export default ModalDisplay
