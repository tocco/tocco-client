export default (val, arr, options) => {
  if (arr.includes(val)) {
    return options.fn(this)
  }
  return options.inverse(this)
}
