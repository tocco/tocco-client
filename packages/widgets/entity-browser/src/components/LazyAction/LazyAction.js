import PropTypes from 'prop-types'
import {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

const actions = {
  delete: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Delete')),
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */ './actions/InputEdit')),
  'subscribe-calendar': lazy(() => import(/* webpackChunkName: "actions" */ './actions/SubscribeCalendar'))
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
