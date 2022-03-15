export default (attributeName, stateName) => {
  return (state, {payload}) => {
    const val = payload[attributeName]
    return {...state, [stateName]: val}
  }
}
