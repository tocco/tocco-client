import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {scale, theme} from '../../utilStyles'
import {declareTypograhpy, StyledSpan} from '../../Typography'

const StyledHtmlFormatter = styled(StyledSpan)`
  &&& {
    ${props => declareTypograhpy(props, 'html')}
    margin: 0 0 ${scale.space(-1)};

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      border-radius: 6px;
      padding: .3em;
    }

    .label-danger {
      background-color: ${theme.color('signal.danger.paper')};
      color: ${theme.color('signal.danger.text')};
    }

    .label-info {
      background-color: ${theme.color('signal.info.paper')};
      color: ${theme.color('signal.info.text')};
    }

    .label-warning {
      background-color: ${theme.color('signal.warning.paper')};
      color: ${theme.color('signal.warning.text')};
    }

    .label-success {
      background-color: ${theme.color('signal.success.paper')};
      Color: ${theme.color('signal.success.text')};
    }
  }
`

const HtmlFormatter = props => {
  return <StyledHtmlFormatter dangerouslySetInnerHTML={{__html: props.value}}/>
}

HtmlFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export {
  HtmlFormatter as default,
  StyledHtmlFormatter
}
