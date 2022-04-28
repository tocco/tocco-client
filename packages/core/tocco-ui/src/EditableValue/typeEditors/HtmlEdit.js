import PropTypes from 'prop-types'
import {lazy, useEffect, Suspense} from 'react'
import {html} from 'tocco-util'

import Typography from '../../Typography'
import {StyledHtmlEdit} from './StyledHtmlEdit'

const LazyQuill = lazy(() => import(/* webpackChunkName: "vendor-quill" */ 'react-quill'))

const HtmlEdit = ({onChange, immutable, value, name, id}) => {
  useEffect(() => {
    // eslint-disable-next-line chai-friendly/no-unused-expressions
    import(/* webpackChunkName: "vendor-quill" */ '!style-loader!css-loader!react-quill/dist/quill.snow.css')
    // eslint-disable-next-line chai-friendly/no-unused-expressions
    import(/* webpackChunkName: "vendor-quill" */ '!style-loader!css-loader!react-quill/dist/quill.core.css')
  }, [])

  const handleChange = (value, delta, source) => {
    if (onChange && source === 'user') {
      const v = value === '<p><br></p>' ? '' : value
      onChange(v)
    }
  }

  const sanitizedValue = html.sanitizeHtml(value)

  if (immutable) {
    return (
      <Typography.Span>
        <div dangerouslySetInnerHTML={{__html: sanitizedValue}} />
      </Typography.Span>
    )
  }

  return (
    <StyledHtmlEdit>
      <Suspense fallback={<i />}>
        <LazyQuill
          name={name}
          onChange={handleChange}
          id={id}
          theme="snow"
          defaultValue={sanitizedValue}
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
