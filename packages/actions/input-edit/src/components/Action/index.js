import {lazy} from 'react'
import {actions} from 'tocco-app-extensions'

const actionMap = {
  'input-edit-info': lazy(() => import(/* webpackChunkName: "actions" */ './actions/InputEditInfo'))
}

const LazyAction = actions.actionFactory(actionMap)

export default LazyAction
