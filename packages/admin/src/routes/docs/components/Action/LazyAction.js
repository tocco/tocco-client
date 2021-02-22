import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {actionEmitter} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

const actions = {
  'dms-create-folder': lazy(() => import(/* webpackChunkName: "docs-actions" */'./actions/CreateFolder')),
  'dms-create-domain': lazy(() => import(/* webpackChunkName: "docs-actions" */'./actions/CreateDomain')),
  'dms-edit': lazy(() => import(/* webpackChunkName: "docs-actions" */'./actions/Edit')),
  'delete': lazy(() => import(/* webpackChunkName: "docs-actions" */'./actions/Delete'))
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
