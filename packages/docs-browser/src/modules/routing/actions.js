export const NAVIGATE = 'docs/routing/NAVIGATE'
export const SET_PARAMS = 'docs/routing/SET_PARAMS'

export const navigate = path => ({
  type: NAVIGATE,
  payload: {
    path: path || ""
  }
})

export const setParams = params => ({
  type: SET_PARAMS,
  payload: {
    params
  }
})
