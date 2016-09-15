export const CHANGE_STRATEGY = 'MergeStrategy/CHANGE_STRATEGY'

export const changeStrategy = (name, value) => ({
  type: CHANGE_STRATEGY,
  payload: {
    name,
    value
  }
})
