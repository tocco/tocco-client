export default attributeName => state => (
  {
    ...state,
    [attributeName]: !state[attributeName]
  }
)
