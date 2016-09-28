/**
 * Get all lines with '// real-import:' prefix and returns them
 */
const extractRealImports = (txt) => {
  var regexExpr = /\/\/ real-import:(.*)/g
  var match = regexExpr.exec(txt)

  if (!match) return ''

  var result = []
  while (match != null) {
    result.push(match[1])
    match = regexExpr.exec(txt)
  }
  return result.join('\n')
}

/**
 *  Counts number of leading spaces on first line and removes them on every line
 */
const removeIndent = (txt) => {
  var amountLeadingSpaced = txt.search(/\S/)
  var regexExp = new RegExp(`^( {${amountLeadingSpaced}})`, 'gm')
  return txt.replace(regexExp, '')
}

const escapeRegExp = (str) => {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

/**
 *  Get all lines between example start and example end string or the whole string if not present
 */
const extractExampleCode = (txt) => {
  var startString = '{/* start example */}'
  var endString = '{/* end example */}'

  if (txt.indexOf(startString) <= -1) return txt

  var regexExpr = new RegExp(`${escapeRegExp(startString)}[\\r\\n]([\\s\\S]*?)[\r\n].*${escapeRegExp(endString)}`, '')
  return txt.match(regexExpr).pop()
}

export {extractExampleCode, extractRealImports, removeIndent}
