export const FETCH_ACTION_PACKAGES = 'actions/FETCH_ACTION_PACKAGES'
export const SET_ACTION_PACKAGES = 'actions/SET_ACTION_PACKAGES'

export const fetchActionPackages = () => ({
  type: FETCH_ACTION_PACKAGES
})

export const setActionPackages = actionPackages => ({
  type: SET_ACTION_PACKAGES,
  payload: {
    actionPackages
  }
})
