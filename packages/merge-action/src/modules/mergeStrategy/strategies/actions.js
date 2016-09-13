export const CHANGE_STRATEGY = 'MergeStrategy/CHANGE_STRATEGY'

export function changeStrategy(name, value) {
  return {
    type: CHANGE_STRATEGY,
    payload: {
      name,
      value
    }
  }
}
