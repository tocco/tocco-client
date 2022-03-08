import PropTypes from 'prop-types'
import React, {useMemo, useRef, useLayoutEffect, useCallback, useEffect} from 'react'
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

const ModalContent = ({closable, message, title, close, id, component: Component}) => {
  const ref = useRef(null)

  const handleCloseClick = useCallback(() => {
    close(id)
  }, [close, id])

  useEffect(() => {
    const handleKeyInput = e => {
      if (e.key === 'Escape') {
        handleCloseClick()
      }
    }

    document.addEventListener('keydown', handleKeyInput)
    return () => {
      document.removeEventListener('keydown', handleKeyInput)
    }
  }, [handleCloseClick])

  useLayoutEffect(() => {
    if (ref.current) {
      // prevent mobile keyboard from pushing the modal up
      setTimeout(() => window.scrollTo(0, 0), 10)
    }
  }, [ref])

  // Component is a valid dependency
  const ComponentMemo = useMemo(() => {
    return <Component close={handleCloseClick} />
  }, [Component, handleCloseClick]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GlobalTetherStyle />
      <StyledModalWrapper>
        <StyledModalContent ref={ref}>
          <StyledModalHeader>
            {title && (
              <StyledTitleWrapper>
                <Typography.H1>
                  <Content>{title}</Content>
                </Typography.H1>
              </StyledTitleWrapper>
            )}
            {closable && (
              <StyledCloseButton onClick={handleCloseClick} type="button">
                ✕
              </StyledCloseButton>
            )}
          </StyledModalHeader>
          <StyledModalBody>
            {message && (
              <Typography.Span>
                <Content>{message}</Content>
              </Typography.Span>
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
  close: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  closable: PropTypes.bool
}

export default ModalContent
