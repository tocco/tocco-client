import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue, Typography, scale} from 'tocco-ui'
import _isString from 'lodash/isString'
import styled from 'styled-components'

import {StyledModalButton} from '../modules/modalComponents/ModalButtons'

const containsHtml = s => s && /<\/?[a-zA-Z0-9]*\/?>/.test(s)
const isKey = s => s && s.startsWith('client.')

const Content = props => {
  const {content} = props
  return _isString(content)
    ? containsHtml(content)
      ? <FormattedValue type="html" value={content}/>
      : isKey(content)
        ? <props.tag><FormattedMessage id={content}/></props.tag>
        : <props.tag>{content}</props.tag>
    : content.type && content.type.displayName === 'FormattedMessage'
      ? <props.tag>{content}</props.tag>
      : content
}

export const StyledTitleWrapper = styled.div`
  position: fixed;
  top: 10%;
`

export const StyledMessageWrapper = styled.div`
  margin-top: ${({closable, hasTitle, titleHeight}) => closable
  ? `${titleHeight}px`
    : hasTitle
    ? scale.space(2.2)
    : scale.space(0.5)
  };

  ${StyledModalButton} {
    margin-bottom: 0;
  }
`

const StyledChildrenWrapper = styled.div``

Content.defaultProps = {
  tag: Typography.P
}

Content.propTypes = {
  /**
   * Provide a component, a string or a translation key. HTNML in strings is allowed and styled properly.
   */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Translations and strings which not contain HTML are wrapped in passed in tag. Default is 'Typography.P'
   */
  tag: PropTypes.func
}

const TitleMessage = ({title, message, children, closable}) => {
  const [titleHeight, setTitleHeight] = useState(0)
  const ref = useRef(null)

  const observer = new ResizeObserver(entries => {
    const {height} = entries[0].contentRect
    setTitleHeight(height)
  })

  useEffect(() => {
    const observable = ref.current
    if (observable) {
      observer.observe(observable)
    }
    return () => {
      if (observable) {
        observer.unobserve(observable)
      }
    }
  }, [ref, observer])

  return (
    <>
      {title && <StyledTitleWrapper ref={ref}>
        <Content content={title} tag={Typography.H1} />
      </StyledTitleWrapper>}
      <StyledMessageWrapper closable={closable} hasTitle={!!title} titleHeight={titleHeight}>
        {message && <Content content={message}/>}
        <StyledChildrenWrapper>
          {children}
        </StyledChildrenWrapper>
      </StyledMessageWrapper>
    </>
  )
}

TitleMessage.propTypes = {
  /**
   * Provide a component, a string or a translation key optionally.
   * Strings and translation keys are rendered as <h4>.
   */
  title: PropTypes.node,
  /**
   * Provide a component, a string or a translation key optionally.
   * Strings and translation keys are rendered as <p>.
   */
  message: PropTypes.node,
  children: PropTypes.node,
  closable: PropTypes.bool
}

export {
  TitleMessage as default,
  Content
}
