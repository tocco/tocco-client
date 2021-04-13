import React from 'react'
import propTypes from 'prop-types'

import ModalContent from './ModalContent'
import {StyledPageOverlay} from './StyledComponents'

const ModalDisplay = ({modals, close}) => (
  <>
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
    {modals.length > 0 && <StyledPageOverlay/>}
  </>
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
