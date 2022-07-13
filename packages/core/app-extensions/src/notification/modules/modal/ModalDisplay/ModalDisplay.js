import propTypes from 'prop-types'
import ReactDOM from 'react-dom'

import ModalContent from './ModalContent'
import {StyledPageOverlay, StyledModalHolder} from './StyledComponents'

const ModalDisplay = ({modals, close}) =>
  modals.length > 0 &&
  ReactDOM.createPortal(
    <StyledModalHolder>
      {modals.map((modal, idx) => (
        <ModalContent
          key={idx}
          id={modal.id}
          title={modal.title}
          message={modal.message}
          component={modal.component}
          onClose={close}
          onCancel={id => {
            close(id)
            if (modal.cancelable && modal.cancelCallback) {
              modal.cancelCallback()
            }
          }}
          cancelable={modal.cancelable}
        />
      ))}
      <StyledPageOverlay />
    </StyledModalHolder>,
    document.body
  )

ModalDisplay.propTypes = {
  modals: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.oneOfType([propTypes.string, propTypes.number]),
      title: propTypes.oneOfType([propTypes.string, propTypes.node]),
      message: propTypes.oneOfType([propTypes.string, propTypes.node]),
      component: propTypes.func,
      cancelable: propTypes.bool,
      cancelCallback: propTypes.func
    })
  ),
  close: propTypes.func
}

export default ModalDisplay
