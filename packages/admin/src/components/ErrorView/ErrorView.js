import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Typography, Icon} from 'tocco-ui'
import styled from 'styled-components'

const StyledErrorView = styled.div`
  width: 100%;
  text-align: center;

  h1 {
    max-width: 650px;
    margin: 0 auto;
  }
`

const ErrorView = ({message, technicalReason}) => {
  return <StyledErrorView>
    <Icon icon="times" style={{color: '#C01E30', fontSize: '80px'}}/>
    <Typography.H1><FormattedMessage id={message || 'client.admin.errorView.defaultTitle'}/></Typography.H1>
    <Typography.Span>{technicalReason}</Typography.Span>
  </StyledErrorView>
}

ErrorView.propTypes = {
  technicalReason: PropTypes.string,
  message: PropTypes.string
}

export default ErrorView
