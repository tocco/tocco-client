export default attributeName => {
  return (state, {payload}) => {
    const val = payload[attributeName]
    return {
      ...state,
      [attributeName]: val
    }
  }
}
