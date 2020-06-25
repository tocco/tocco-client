import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {actionEmitter} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

const actions = {
  'user-qr-action': lazy(() => import(/* webpackChunkName: "actions" */'./actions/UserQrAction')),
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */'./actions/InputEdit')),
  'resourcescheduler': lazy(() => import(/* webpackChunkName: "actions" */'./actions/ResourceScheduler')),
  'show-output-jobs-action': lazy(() => import(/* webpackChunkName: "actions" */'./actions/ShowOutputJobsAction')),
  'cash_management_import': lazy(() => import(/* webpackChunkName: "actions" */'./actions/CashManagementImport')),
  'delete': lazy(() => import(/* webpackChunkName: "actions" */'./actions/Delete'))
}

const renderLoader = () => <LoadMask/>

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

  return <Suspense fallback={renderLoader()}>
    <ActionComponent {...props}/>
  </Suspense>
}

LazyAction.propTypes = {
  appId: PropTypes.string.isRequired
}

export default LazyAction
