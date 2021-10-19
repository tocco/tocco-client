import React from 'react'
import {Icon, scale, theme, Typography} from 'tocco-ui'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledErrorView = styled.div`
  width: 50vw;
  max-width: 650px;
  padding: ${scale.space(1)};
  text-align: center;
  margin: 20vh auto auto;

  h1 {
    margin: 0 auto;
  }
`

const StyledIconWrapper = styled.span`
  color: ${theme.color('signal.danger.text')};
  font-size: ${scale.font(13.4)};
`

const ErrorView = ({title, message}) => {
  return <StyledErrorView>
    <StyledIconWrapper>
      <Icon icon="times"/>
    </StyledIconWrapper>
    <Typography.H1>
      {title}
    </Typography.H1>
    <Typography.Span>{message}</Typography.Span>
  </StyledErrorView>
}

ErrorView.propTypes = {
  title: PropTypes.element.isRequired,
  message: PropTypes.element.isRequired
}

export default ErrorView
