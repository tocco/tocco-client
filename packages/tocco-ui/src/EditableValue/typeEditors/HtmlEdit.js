import PropTypes from 'prop-types'
import React, {lazy, Suspense} from 'react'
import styled from 'styled-components'
import {html} from 'tocco-util'

import Typography, {declareTypograhpy} from '../../Typography'

const StyledHtmlEdit = styled.div`
  && {
    button {
      margin-bottom: 0;
    }

    .ql-editor {
      ${props => declareTypograhpy(props, 'quill')}

      &[contenteditable='false'] * {
        cursor: not-allowed;
      }
    }
  }
`

class HtmlEdit extends React.Component {
  lazyQuill = null

  constructor(props) {
    super(props)

    // eslint-disable-next-line chai-friendly/no-unused-expressions
    import(/* webpackChunkName: "vendor-quill" */ '!style-loader!css-loader!react-quill/dist/quill.snow.css')
    // eslint-disable-next-line chai-friendly/no-unused-expressions
    import(/* webpackChunkName: "vendor-quill" */ '!style-loader!css-loader!react-quill/dist/quill.core.css')

    this.lazyQuill = lazy(() => import(/* webpackChunkName: "vendor-quill" */ 'react-quill'))
  }

  handleChange = (value, delta, source) => {
    if (this.props.onChange && source === 'user') {
      const v = value === '<p><br></p>' ? '' : value
      this.props.onChange(v)
    }
  }

  render() {
    if (this.props.immutable) {
      return <Typography.Span>
        <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(this.props.value)}}></div>
      </Typography.Span>
    }

    return (
      <StyledHtmlEdit>
        <Suspense fallback={<i/>}>
          <this.lazyQuill
            name={this.props.name}
            onChange={this.handleChange}
            id={this.props.id}
            theme="snow"
            defaultValue={this.props.value}
            modules={{
              clipboard: {
                matchVisual: false
              }
            }}
          />
        </Suspense>
      </StyledHtmlEdit>
    )
  }
}

HtmlEdit.defaultProps = {
  value: ''
}

HtmlEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default HtmlEdit
