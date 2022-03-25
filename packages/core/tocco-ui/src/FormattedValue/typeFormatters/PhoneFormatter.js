import PropTypes from 'prop-types'
import React, {lazy, Suspense} from 'react'

const LibPhoneFormatter = lazy(() => import(/* webpackChunkName: "phone-formatter" */ './LibPhoneFormatter'))

const LazyPhoneFormatter = props => (
  <Suspense fallback={props.value}>
    <LibPhoneFormatter {...props} />
  </Suspense>
)

LazyPhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default LazyPhoneFormatter
