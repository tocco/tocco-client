import {action} from 'tocco-util'

import {setScrollBehaviour, setSearchFormCollapsed} from './modules/list/actions'

export const getDispatchActions = input => action.getDispatchActions(input, actionSettings)

const actionSettings = [
  {
    name: 'searchFormCollapsed',
    action: setSearchFormCollapsed,
    argsFactory: input => [input.searchFormCollapsed]
  },
  {
    name: 'scrollBehaviour',
    action: setScrollBehaviour,
    argsFactory: input => [input.scrollBehaviour]
  }
]
