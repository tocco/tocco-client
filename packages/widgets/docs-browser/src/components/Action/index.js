import {lazy} from 'react'
import {actions} from 'tocco-app-extensions'

const actionMap = {
  'dms-create-folder': lazy(() => import(/* webpackChunkName: "docs-actions" */ './actions/CreateFolder')),
  'dms-create-domain': lazy(() => import(/* webpackChunkName: "docs-actions" */ './actions/CreateDomain')),
  'dms-edit': lazy(() => import(/* webpackChunkName: "docs-actions" */ './actions/Edit')),
  'dms-move': lazy(() => import(/* webpackChunkName: "docs-actions" */ './actions/MoveContainer')),
  delete: lazy(() => import(/* webpackChunkName: "docs-actions" */ './actions/Delete'))
}

const LazyAction = actions.actionFactory(actionMap)

export default LazyAction
