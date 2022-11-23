import {lazy} from 'react'
import {actions} from 'tocco-app-extensions'

const actionMap = {
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
  export: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Export')),
  'reload-configuration': lazy(() => import(/* webpackChunkName: "actions" */ './actions/Configuration'))
}

const LazyAction = actions.actionFactory(actionMap)

export default LazyAction
