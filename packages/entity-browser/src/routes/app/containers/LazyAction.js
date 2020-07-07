import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {consoleLogger, selection as selectionUtil} from 'tocco-util'

const actions = {
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */'./actions/InputEdit'))
}

const getSelection = location => location.state && location.state.selection
  ? location.state.selection
  : selectionUtil.queryStringToSelection(location.search)

const mapStateToProps = (state, props) => ({
  selection: getSelection(props.router.location)
})

const renderLoader = () => <LoadMask/>

const LazyAction = props => {
  const {appId} = props.router.match.params
  const LazyAction = actions[appId]

  if (!LazyAction) {
    consoleLogger.logError(`no action found with id: ${appId}`)
    return null
  }

  const ActionComponent = connect(mapStateToProps)(LazyAction)

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
