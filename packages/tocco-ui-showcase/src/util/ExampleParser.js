import escapeRegExp from 'lodash/escapeRegExp'

/**
 * Get all lines with '// real-import:' prefix and returns them
 */
const extractRealImports = txt => {
  const regexExpr = /\/\/ *real-import:(.*)/g
  let match = regexExpr.exec(txt)

  if (!match) return ''

  const result = []
  while (match != null) {
    result.push(match[1])
    match = regexExpr.exec(txt)
  }
  return result.join('\n')
}

/**
 *  Counts number of leading spaces on first line and removes them on every line
 */
const removeIndent = txt => {
  const amountLeadingSpaced = txt.search(/\S/)
  const regexExp = new RegExp(`^( {${amountLeadingSpaced}})`, 'gm')
  return txt.replace(regexExp, '')
}

/**
 *  Get all lines between example start and example end string or the whole string if not present
 */
const extractExampleCode = txt => {
  const startString = '{/* start example */}'
  const endString = '{/* end example */}'

  if (txt.indexOf(startString) <= -1 || txt.indexOf(endString) <= -1) return txt

  const regexExpr = new RegExp(`${escapeRegExp(startString)}[\\r\\n]([\\s\\S]*?)[\r\n].*${escapeRegExp(endString)}`, '')
  return txt.match(regexExpr).pop()
}

export {extractExampleCode, extractRealImports, removeIndent}
