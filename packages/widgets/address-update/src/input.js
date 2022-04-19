import {loadView} from './modules/addressUpdate/actions'

export const getDispatchActions = () => {
  const actions = []

  actions.push(loadView())

  return actions
}
