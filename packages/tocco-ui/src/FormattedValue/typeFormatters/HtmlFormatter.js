import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {declareTypograhpy} from '../../Typography'

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
