export const getSortingFromQuery = query => {
  const sortingIndex = query.indexOf('order by ')
  if (sortingIndex >= 0) {
    return query
      .substring(sortingIndex + 'order by '.length)
      .split(',')
      .map(sorting => sorting.trim())
      .map(sorting => sorting.split(/\s+/))
      .map(([field, order]) => ({field, order: order || 'asc'}))
  } else {
    return []
  }
}
