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
      background: none !important; // nice2 reset
      font-size: 100% !important; // nice2 reset
      font-weight: ${theme.fontWeight('regular')} !important; // nice2 reset
    }

    .label-danger {
      color: ${theme.color('signal.danger.text')};
    }

    .label-info {
      color: ${theme.color('signal.info.text')};
    }

    .label-warning {
      color: ${theme.color('signal.warning.text')};
    }

    .label-success {
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
