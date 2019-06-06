import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import lazyComponent from '../../util/lazyComponent'
import {declareTypograhpy} from '../../Typography'

const StyledHtmlEdit = styled.div`
&& {
  button {
    margin-bottom: 0;
  }

  .ql-editor {
    ${props => declareTypograhpy(props, 'quill')}

    &[contenteditable] * {
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

    this.lazyQuill = lazyComponent(() => import(/* webpackChunkName: "quill" */ 'react-quill'), 'default')
  }

  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <StyledHtmlEdit>
        <this.lazyQuill
          name={this.props.name}
          onChange={this.handleChange}
          id={this.props.id}
          theme="snow"
          value={this.props.value}
          readOnly={this.props.immutable}
          modules={{toolbar: !this.props.immutable}}
        />
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
