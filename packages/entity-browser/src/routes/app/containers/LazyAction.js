import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {consoleLogger, queryString as queryStringUtil} from 'tocco-util'
import _get from 'lodash/get'
import {actionEmitter} from 'tocco-app-extensions'

const actions = {
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */'./actions/InputEdit'))
}

const mapStateToProps = (state, props) => {
  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(props.router.location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(props.router.location, 'state.definition.properties', queryParams.actionProperties)

  return {
    selection,
    actionProperties
  }
}

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const renderLoader = () => <LoadMask/>

const LazyAction = props => {
  const {appId} = props.router.match.params
  const LazyAction = actions[appId]

  if (!LazyAction) {
    consoleLogger.logError(`no action found with id: ${appId}`)
    return null
  }

  const ActionComponent = connect(mapStateToProps, mapActionCreators)(LazyAction)

  return <Suspense fallback={renderLoader()}>
    <ActionComponent {...props}/>
  </Suspense>
}

LazyAction.propTypes = {
  router: PropTypes.shape({
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }).isRequired
}

export default LazyAction
