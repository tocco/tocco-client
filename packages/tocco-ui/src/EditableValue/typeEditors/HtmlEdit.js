import PropTypes from 'prop-types'
import React, {lazy, Suspense} from 'react'
import styled from 'styled-components'

import {declareTypograhpy} from '../../Typography'

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

    import(/* webpackChunkName: "quill" */ '!style-loader!css-loader!react-quill/dist/quill.snow.css')
    import(/* webpackChunkName: "quill" */ '!style-loader!css-loader!react-quill/dist/quill.core.css')

    this.lazyQuill = lazy(() => import(/* webpackChunkName: "quill" */ 'react-quill'))
  }

  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <StyledHtmlEdit>
        <Suspense fallback={<i/>}>
          <this.lazyQuill
            name={this.props.name}
            onChange={this.handleChange}
            id={this.props.id}
            theme="snow"
            value={this.props.value}
            readOnly={this.props.immutable}
            modules={{toolbar: !this.props.immutable}}
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
