import PropTypes from 'prop-types'
import React from 'react'

import {declareTypograhpy} from '../../Typography'
import styled from 'styled-components'

const StyledHtmlFormatter = styled.div`
&& {
  ${props => declareTypograhpy(props, 'html')}
}
`

const HtmlFormatter = props => <StyledHtmlFormatter dangerouslySetInnerHTML={{__html: props.value}}/>

HtmlFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export default HtmlFormatter
