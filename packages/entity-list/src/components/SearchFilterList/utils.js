export const searchFilterCompare = (a, b) => {
  return a.defaultFilter || b.defaultFilter
    ? a.defaultFilter ? -1 : 1
    : (a.sorting === null) - (b.sorting === null) || a.sorting - b.sorting
}
