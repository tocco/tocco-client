import {lazy} from 'react'
import {actions} from 'tocco-app-extensions'

const actionMap = {
  delete: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Delete')),
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */ './actions/InputEdit')),
  'subscribe-calendar': lazy(() => import(/* webpackChunkName: "actions" */ './actions/SubscribeCalendar'))
}

const LazyAction = actions.actionFactory(actionMap)

export default LazyAction
