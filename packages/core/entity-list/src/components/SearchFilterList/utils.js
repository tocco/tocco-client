export const searchFilterCompare = (a, b) => {
  if (a.defaultFilter || b.defaultFilter) {
    return a.defaultFilter ? -1 : 1
  }

  return (a.sorting === null) - (b.sorting === null) || a.sorting - b.sorting
}
