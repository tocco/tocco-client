import PropTypes from 'prop-types'
import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

const actions = {
  'widget-code-copy': lazy(() => import(/* webpackChunkName: "actions" */ './actions/WidgetCodeCopy')),
  'user-qr-action': lazy(() => import(/* webpackChunkName: "actions" */ './actions/UserQrAction')),
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */ './actions/InputEdit')),
  resourcescheduler: lazy(() => import(/* webpackChunkName: "actions" */ './actions/ResourceScheduler')),
  'show-output-jobs-action': lazy(() => import(/* webpackChunkName: "actions" */ './actions/ShowOutputJobsAction')),
  delete: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Delete')),
  merge: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Merge')),
  copy: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Copy')),
  'entity-report': lazy(() => import(/* webpackChunkName: "actions" */ './actions/EntityReport')),
  documents: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Documents')),
  'password-update': lazy(() => import(/* webpackChunkName: "actions" */ './actions/PasswordUpdate')),
  'widget-config-edit': lazy(() => import(/* webpackChunkName: "actions" */ './actions/WidgetConfigEdit')),
  'connect-principal': lazy(() => import(/* webpackChunkName: "actions" */ './actions/ConnectPrincipal')),
  export: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Export'))
}

const renderLoader = () => <LoadMask />

const LazyAction = props => {
  const {appId} = props
  const LazyAction = actions[appId]

  if (!LazyAction) {
    consoleLogger.logError(`no action found with id: ${appId}`)
    return null
  }

  const ActionComponent = connect(null, {
    emitAction: action => actionEmitter.dispatchEmittedAction(action)
  })(LazyAction)

  return (
    <Suspense fallback={renderLoader()}>
      <ActionComponent {...props} />
    </Suspense>
  )
}

LazyAction.propTypes = {
  appId: PropTypes.string.isRequired
}

export default LazyAction
