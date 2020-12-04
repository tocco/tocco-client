import React, {useState} from 'react'
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

  const handleCloseClick = () => {
    setIsClosing(true)
    close(id)
  }

  return (
    <StyledModalWrapper>
      <StyledModalContent isClosing={isClosing}>
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
