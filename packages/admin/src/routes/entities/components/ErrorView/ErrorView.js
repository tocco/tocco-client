import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Typography, Icon, theme, scale} from 'tocco-ui'
import styled from 'styled-components'

import {currentViewPropType} from '../../utils/propTypes'

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

const ErrorView = ({currentViewInfo}) => {
  const prefix = 'client.admin.entity.errorView.'
  const title = currentViewInfo.type === 'detail'
    ? 'detailTitle'
    : 'defaultTitle'

  const description = currentViewInfo.type === 'detail'
    ? 'detailDescription'
    : currentViewInfo.type === 'list' && currentViewInfo.error.relationName
      ? 'relationDescription'
      : 'listDescription'

  return <StyledErrorView>
    <StyledIconWrapper>
      <Icon icon="times"/>
    </StyledIconWrapper>
    <Typography.H1>
      <FormattedMessage id={prefix + title}/>
    </Typography.H1>
    <Typography.Span><FormattedMessage id={prefix + description} values={currentViewInfo.error}/></Typography.Span>
  </StyledErrorView>
}

ErrorView.propTypes = {
  technicalReason: PropTypes.string,
  message: PropTypes.string,
  currentViewInfo: currentViewPropType
}

export default ErrorView
