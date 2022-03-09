import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {html} from 'tocco-util'

import {declareTypograhpy, StyledSpan} from '../../Typography'
import {scale, theme} from '../../utilStyles'

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
      padding-left: 0 !important; // nice2 reset
      white-space: normal !important; // nice2 reset
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
      color: ${theme.color('signal.success.text')};
    }
  }
`

const HtmlFormatter = ({value, breakWords}) => (
  <StyledHtmlFormatter dangerouslySetInnerHTML={{__html: html.sanitizeHtml(value)}} breakWords={breakWords} />
)

HtmlFormatter.propTypes = {
  value: PropTypes.string.isRequired,
  breakWords: PropTypes.bool
}

export {HtmlFormatter as default, StyledHtmlFormatter}
