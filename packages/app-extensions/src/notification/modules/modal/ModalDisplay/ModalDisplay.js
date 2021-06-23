import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

import ModalContent from './ModalContent'
import {StyledPageOverlay, StyledModalHolder} from './StyledComponents'

const ModalDisplay = ({modals, close}) => (
  modals.length > 0 && ReactDOM.createPortal(<StyledModalHolder>
    {modals.map((modal, idx) =>
      <ModalContent
        key={idx}
        id={modal.id}
        title={modal.title}
        message={modal.message}
        component={modal.component}
        close={close}
        closable={modal.closable}
      />
    )}
    <StyledPageOverlay/>
  </StyledModalHolder>, document.body)
)

ModalDisplay.propTypes = {
  modals: propTypes.arrayOf(propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    title: propTypes.oneOfType([propTypes.string, propTypes.node]),
    message: propTypes.oneOfType([propTypes.string, propTypes.node]),
    component: propTypes.func
  })),
  close: propTypes.func,
  closable: propTypes.bool
}

export default ModalDisplay
