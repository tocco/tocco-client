import queryStringUtil from 'query-string'

export const selectionToQueryString = selection =>
  `selection=${encodeURIComponent(JSON.stringify(selection))}`

export const queryStringToSelection = queryString => {
  const obj = queryStringUtil.parse(queryString)
  return obj.selection ? JSON.parse(obj.selection) : null
}
