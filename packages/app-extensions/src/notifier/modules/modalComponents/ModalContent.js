import React, {useState, useLayoutEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TitleMessage from '../../components/TitleMessage'
import {StyledModalContent, basePadding} from './StyledModalContent'

export const StyledCloseButton = styled.button`
  // copy: react-redux-toastr (index.scss)
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  height: auto;  // reset
  opacity: .8;  // reset
  outline: none;
  position: sticky;
  top: ${basePadding};  // reset
  padding-right: 0;
  width: auto;  // reset
  z-index: 2;
  display: flex;
  align-self: flex-end;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

const ModalContent = props => {
  const {
    closable,
    message,
    title,
    close,
    id
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [modalWidth, setModalWidth] = useState(0)
  const ref = useRef(null)

  const handleCloseClick = () => {
    setIsClosing(true)
    setTimeout(() => {
      close(id)
    }, 300) // Toastr fade out takes 300ms
  }

  const observer = new ResizeObserver(entries => {
    const {width} = entries[0].contentRect
    setModalWidth(width)
  })

  useLayoutEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.unobserve(ref.current)
  }, [ref, observer])

  return <div className="rrt-confirm-holder" >
    <StyledModalContent isClosing={isClosing} ref={ref} titleWidth={modalWidth}>
      {closable && <StyledCloseButton onClick={handleCloseClick} type="button">
            ✕
      </StyledCloseButton>}
      <TitleMessage title={title} message={message} closable={closable}>
        <props.component close={handleCloseClick}/>
      </TitleMessage>
    </StyledModalContent>
    <div className={`shadow animated ${isClosing ? 'fadeOut' : 'fadeIn'}`} />
  </div>
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
