export const searchFilterCompare = (a, b) => {
  return a.defaultFilter
    ? -1
    : (a.sorting === null) - (b.sorting === null) || a.sorting - b.sorting
}
