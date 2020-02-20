export const getParameterValue = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const evaluateFulltext = query => {
  const matchFulltext = query.match(/.*fulltext\("(.*)"\).*/)
  if (matchFulltext) {
    return matchFulltext[1]
  }
  return null
}
