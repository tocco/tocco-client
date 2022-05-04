import PropTypes from 'prop-types'
import {lazy, Suspense} from 'react'

const LibPhoneFormatter = lazy(() => import(/* webpackChunkName: "phone-formatter" */ './LibPhoneFormatter'))

const LazyPhoneFormatter = props => (
  /**
   * Having a fallback value of `props.value` leads to react errors
   * when user has installed a browser plugin that interacts with phone numbers.
   *
   * The number is rendered (unformatted) and right afte that React wants to remove fallback node
   * to replace it with LibPhoneFormatter. When fallback node already has been touched from the
   * browser plugin react cannot interact with it anymore.
   */
  <Suspense fallback="">
    <LibPhoneFormatter {...props} />
  </Suspense>
)

LazyPhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default LazyPhoneFormatter
