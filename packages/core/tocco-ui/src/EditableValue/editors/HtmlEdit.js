import PropTypes from 'prop-types'
import {lazy, Suspense} from 'react'

import Typography from '../../Typography'

const LazyHtmlEditor = lazy(() => import(/* webpackChunkName: "html-editor" */ '../../HtmlEditor'))

const HtmlEdit = ({onChange, immutable, value, options}) => {
  const handleChange = changedValue => {
    if (onChange) {
      onChange(changedValue)
    }
  }

  // value does not have to be sanitized because it's garanteed to be save form the backend
  if (immutable) {
    return (
      <Typography.Span>
        <div dangerouslySetInnerHTML={{__html: value}} />
      </Typography.Span>
    )
  }

  const {contentLang, ckEditorConfig} = options || {}

  return (
    <Suspense fallback={<i />}>
      <LazyHtmlEditor onChange={handleChange} value={value} contentLang={contentLang} ckEditorConfig={ckEditorConfig} />
    </Suspense>
  )
}

HtmlEdit.defaultProps = {
  value: ''
}

HtmlEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  options: PropTypes.shape({
    contentLang: PropTypes.oneOf(['de', 'fr', 'it', 'en']),
    ckEditorConfig: PropTypes.object
  }),
  immutable: PropTypes.bool
}

export default HtmlEdit
