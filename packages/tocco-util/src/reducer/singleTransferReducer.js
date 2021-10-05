import _set from 'lodash/set'

export default (attributeName, path) => {
  return (state, {payload}) => {
    const val = payload[attributeName]
    const newState = {...state}
    _set(
      newState,
      path ? path + '.' + attributeName : attributeName,
      val
    )
    return newState
  }
}
