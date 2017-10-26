import PropTypes from 'prop-types'
import React from 'react'
import lazyComponent from '../../util/lazyComponent'

class HtmlEdit extends React.Component {
  lazyQuill = null

  constructor(props) {
    super(props)

    import(/* webpackChunkName: "quill" */ '!style-loader!css-loader!react-quill/dist/quill.snow.css')
    import(/* webpackChunkName: "quill" */ '!style-loader!css-loader!react-quill/dist/quill.core.css')

    this.lazyQuill = lazyComponent(() => import(/* webpackChunkName: "quill" */ 'react-quill'))
  }

  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <this.lazyQuill
        name={this.props.name}
        onChange={this.handleChange}
        id={this.props.id}
        theme="snow"
        value={this.props.value}
        readOnly={this.props.readOnly}
        modules={{toolbar: !this.props.readOnly}}
      />
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
  readOnly: PropTypes.bool
}

export default HtmlEdit
