import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Typography, Icon, theme, scale} from 'tocco-ui'
import styled from 'styled-components'

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

const ErrorView = ({message, technicalReason}) => {
  return <StyledErrorView>
    <StyledIconWrapper>
      <Icon icon="times"/>
    </StyledIconWrapper>
    <Typography.H1>
      <FormattedMessage id={message || 'client.admin.errorView.defaultTitle'}/>
    </Typography.H1>
    <Typography.Span>{technicalReason}</Typography.Span>
  </StyledErrorView>
}

ErrorView.propTypes = {
  technicalReason: PropTypes.string,
  message: PropTypes.string
}

export default ErrorView
