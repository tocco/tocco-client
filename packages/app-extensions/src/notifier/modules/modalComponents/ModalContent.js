import React, {useState, useRef, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'

import TitleMessage from '../../components/TitleMessage'
import {
  StyledModalContent,
  StyledModalWrapper,
  StyledCloseButton,
  StyledPageOverlay
} from './StyledComponents'

const ModalContent = ({
  closable,
  message,
  title,
  close,
  id,
  component: Component
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const ref = useRef(null)

  const handleCloseClick = () => {
    setIsClosing(true)
    close(id)
  }

  useLayoutEffect(() => {
    if (ref.current) {
      // prevent mobile keyboard from pushing the modal up
      setTimeout(() => window.scrollTo(0, 0), 10)
    }
  }, [ref])

  return (
    <StyledModalWrapper>
      <StyledModalContent isClosing={isClosing} ref={ref}>
        {closable && <StyledCloseButton onClick={handleCloseClick} type="button">
          ✕
        </StyledCloseButton>}
        <TitleMessage title={title} message={message} closable={closable}>
          <Component close={handleCloseClick}/>
        </TitleMessage>
      </StyledModalContent>
      <StyledPageOverlay/>
    </StyledModalWrapper>
  )
}

ModalContent.propTypes = {
  id: PropTypes.any.isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  closable: PropTypes.bool
}

export default ModalContent
