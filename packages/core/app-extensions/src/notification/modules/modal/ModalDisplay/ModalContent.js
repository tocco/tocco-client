import PropTypes from 'prop-types'
import {useMemo, useRef, useLayoutEffect, useCallback, useEffect} from 'react'
import {Typography, useWindowWidth} from 'tocco-ui'

import Content from '../../../components/Content'
import {
  StyledModalContent,
  StyledModalWrapper,
  StyledModalHeader,
  StyledTitleWrapper,
  StyledModalBody,
  StyledMessageWrapper,
  StyledCloseButton,
  GlobalStyles
} from './StyledComponents'

const ModalContent = ({cancelable, message, title, onClose, onCancel, id, component: Component}) => {
  const ref = useRef(null)

  const handleClose = useCallback(() => {
    onClose(id)
  }, [onClose, id])

  const handelCancel = useCallback(() => {
    onCancel(id)
  }, [onCancel, id])

  useEffect(() => {
    const handleKeyInput = e => {
      if (e.key === 'Escape' && cancelable) {
        handelCancel()
      }
    }

    document.addEventListener('keydown', handleKeyInput)
    return () => {
      document.removeEventListener('keydown', handleKeyInput)
    }
  }, [handelCancel, cancelable])

  useLayoutEffect(() => {
    if (ref.current) {
      // prevent mobile keyboard from pushing the modal up
      setTimeout(() => window.scrollTo(0, 0), 10)
    }
  }, [ref])

  // Component is a valid dependency
  const ComponentMemo = useMemo(() => {
    return <Component close={handleClose} />
  }, [Component, handleClose]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GlobalStyles />
      <StyledModalWrapper>
        <StyledModalContent ref={ref} width={useWindowWidth()}>
          <StyledModalHeader>
            {title && (
              <StyledTitleWrapper>
                <Typography.H1>
                  <Content>{title}</Content>
                </Typography.H1>
              </StyledTitleWrapper>
            )}
            {cancelable && (
              <StyledCloseButton onClick={handelCancel} type="button">
                ✕
              </StyledCloseButton>
            )}
          </StyledModalHeader>
          <StyledModalBody>
            {message && (
              <StyledMessageWrapper>
                <Typography.Span>
                  <Content>{message}</Content>
                </Typography.Span>
              </StyledMessageWrapper>
            )}
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
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  cancelable: PropTypes.bool
}

export default ModalContent
