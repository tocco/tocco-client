import {lazy} from 'react'
import {actions} from 'tocco-app-extensions'

const actionMap = {
  delete: lazy(() => import(/* webpackChunkName: "actions" */ './actions/Delete')),
  'input-edit': lazy(() => import(/* webpackChunkName: "actions" */ './actions/InputEdit')),
  'subscribe-calendar': lazy(() => import(/* webpackChunkName: "actions" */ './actions/SubscribeCalendar')),
  'mailing-list-mail-action': lazy(() => import(/* webpackChunkName: "actions" */ './actions/MailingListMailAction'))
}

const LazyAction = actions.actionFactory(actionMap)

export default LazyAction
