import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {withInternalRouter, withReactRouter} from './withRouter'

const mapStateToProps = state => ({
  compProviderRouterType: state.input.routerType
})

/**
 * Handles different router types:
 * - enhance component with `path`, `params` and `navigate`
 * - renders either internal routing or react router wrapper
 *
 * Example with one component for all router types:
 * ```
 * const MyComp = ({path, params, navigate}) => {}
 *
 * export default withRouterTypeCompProvider(MyComp)
 * ```
 *
 * Example with two component for routerless vs router type:
 * ```
 * const MyRouterlessComp = ({path, params, navigate}) => {}
 * const MyRouterComp = ({path, params, navigate}) => {}
 *
 * export default withRouterTypeCompProvider({routerless: MyRouterlessComp, router: MyRouterComp})
 * ```
 *
 * @param {object} config
 */
export const withRouterTypeCompProvider = config => {
  const {routerless, router} = config

  const RouterlessComp = routerless ? withInternalRouter(routerless) : withInternalRouter(config)
  const RouterComp = router ? withReactRouter(router) : withReactRouter(config)

  const ComponentProvider = ({compProviderRouterType, ...props}) => {
    if (compProviderRouterType === 'routerless') {
      return <RouterlessComp {...props} />
    }

    // inherit & standalone are both using router lib
    return <RouterComp {...props} />
  }

  ComponentProvider.propTypes = {
    compProviderRouterType: PropTypes.oneOf(['routerless', 'inherit', 'standalone'])
  }

  return connect(mapStateToProps)(ComponentProvider)
}
