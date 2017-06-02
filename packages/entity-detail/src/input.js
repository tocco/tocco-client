import {
  loadDetailView
} from './modules/entityDetail/actions'

export const getDispatchActions = input => {
  const actions = [
    loadDetailView()
  ]

  return actions
}
