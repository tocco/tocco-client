export const getParameterValue = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const evaluateINQuery = query => {
  const matchIN = query.replace(/ /g, '').match(/IN\(pk,(.*)\)/)
  if (matchIN) {
    return matchIN[1].split(',')
  }
  return []
}
