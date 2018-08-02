import React from 'react'
import propTypes from 'prop-types'
import ModalContent from './ModalContent'

const ModalDisplay = props => {
  return (
    <div>
      {props.modals.map((modal, idx) =>
        <ModalContent
          key={idx}
          id={modal.id}
          title={modal.title}
          message={modal.message}
          component={modal.component}
          close={props.close}
          closable={modal.closable}
        />
      )}
    </div>
  )
}

ModalDisplay.propTypes = {
  modals: propTypes.arrayOf(propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    title: propTypes.string,
    message: propTypes.string,
    component: propTypes.func
  })),
  close: propTypes.func,
  closable: propTypes.bool
}

export default ModalDisplay
