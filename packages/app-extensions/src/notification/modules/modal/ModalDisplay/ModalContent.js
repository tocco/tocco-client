import React, {useMemo, useRef, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import Content from '../../../components/Content'
import {
  StyledModalContent,
  StyledModalWrapper,
  StyledModalHeader,
  StyledTitleWrapper,
  StyledModalBody,
  StyledCloseButton,
  GlobalTetherStyle
} from './StyledComponents'

const ModalContent = ({
  closable,
  message,
  title,
  close,
  id,
  component: Component
}) => {
  const ref = useRef(null)

  const handleCloseClick = () => {
    close(id)
  }

  useLayoutEffect(() => {
    const handleKeyInput = e => {
      if (e.key === 'Escape') {
        close(id)
      }
    }

    document.addEventListener('keydown', handleKeyInput)
    return () => {
      document.removeEventListener('keydown', handleKeyInput)
    }
  }, [])

  useLayoutEffect(() => {
    if (ref.current) {
      // prevent mobile keyboard from pushing the modal up
      setTimeout(() => window.scrollTo(0, 0), 10)
    }
  }, [ref])

  const ComponentMemo = useMemo(() => {
    return <Component close={handleCloseClick}/>
  }, [Component])

  return (
    <>
      <GlobalTetherStyle/>
      <StyledModalWrapper>
        <StyledModalContent ref={ref}>
          <StyledModalHeader>
            {title && <StyledTitleWrapper>
              <Typography.H1>
                <Content>{title}</Content>
              </Typography.H1>
            </StyledTitleWrapper>}
            {closable && <StyledCloseButton onClick={handleCloseClick} type="button">
              ✕
            </StyledCloseButton>}
          </StyledModalHeader>
          <StyledModalBody>
            {message && <Typography.Span><Content>{message}</Content></Typography.Span>}
            {ComponentMemo}
          </StyledModalBody>
        </StyledModalContent>
      </StyledModalWrapper>
    </>
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
