import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {scale} from '../../utilStyles'
import {declareTypograhpy} from '../../Typography'

const StyledHtmlFormatter = styled.div`
  && {
    ${props => declareTypograhpy(props, 'html')}
    margin: 0 0 ${scale.space(-1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const HtmlFormatter = props => <StyledHtmlFormatter dangerouslySetInnerHTML={{__html: props.value}}/>

HtmlFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export {
  HtmlFormatter as default,
  StyledHtmlFormatter
}
