import PropTypes from 'prop-types'
import {useEffect, Suspense} from 'react'
import {connect} from 'react-redux'
import {LoadMask} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import actionEmitter from '../actionEmitter'
import DynamicAction from './components/DynamicAction'
import {fetchActionPackages as fetchActionPackagesAction} from './modules/dynamicActions/actions'

const renderLoader = () => <LoadMask />

const dynamicActionFactory = actionPackage => {
  if (!actionPackage) {
    return null
  }

  const {packageName, appName} = actionPackage
  return props => <DynamicAction {...props} packageName={packageName} appName={appName} />
}

const getActionPackage = (actionPackages, appId) => {
  const actionPackage = actionPackages ? actionPackages.filter(a => a.actionName === appId) : null
  return actionPackage && actionPackage.length > 0 ? actionPackage[0] : null
}

/**
 * Create ActionComponent that instantiate a LazyAction dependend on the `appId`.
 *
 * @param {Object} actions
 * ```
 * const actions = {delete: React.lazy(() => import('./actions/Delete'))}
 * ```
 * @returns ActionComponent
 */
const actionFactory = actions => {
  const LazyActionWrapper = props => {
    const {appId, fetchActionPackages, actionPackages, ...actionProps} = props

    useEffect(() => {
      fetchActionPackages()
    }, [fetchActionPackages])

    // wait until all actions have beend loaded
    if (typeof actionPackages === 'undefined' || actionPackages === null) {
      return renderLoader()
    }

    const LazyAction = actions[appId] || dynamicActionFactory(getActionPackage(actionPackages, appId))

    if (!LazyAction) {
      consoleLogger.logError(`no action found with id: ${appId}`)
      return null
    }

    const ActionComponent = connect(null, {
      emitAction: action => actionEmitter.dispatchEmittedAction(action)
    })(LazyAction)

    return (
      <Suspense fallback={renderLoader()}>
        <ActionComponent appId={appId} {...actionProps} />
      </Suspense>
    )
  }

  const mapStateToProps = state => ({
    actionPackages: state.dynamicActions.actionPackages
  })

  const mapActionCreators = {
    fetchActionPackages: fetchActionPackagesAction
  }

  LazyActionWrapper.propTypes = {
    appId: PropTypes.string.isRequired,
    fetchActionPackages: PropTypes.func.isRequired,
    actionPackages: PropTypes.array
  }

  return connect(mapStateToProps, mapActionCreators)(LazyActionWrapper)
}

export default actionFactory
