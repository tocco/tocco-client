import React, {lazy, Suspense} from 'react'

import AceEditorPropTypes from './AceEditorPropTypes'

const AceEditor = lazy(() => import(/* webpackChunkName: "code-editor" */ './AceEditor'))

const fallbackTextField = value => (
  <div>
    <p>{value}</p>
  </div>
)

const LazyCodeEditor = props => (
  <Suspense fallback={fallbackTextField(props.value)}>
    <AceEditor {...props} />
  </Suspense>
)

LazyCodeEditor.propTypes = AceEditorPropTypes

export default LazyCodeEditor
