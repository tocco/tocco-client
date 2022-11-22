import DOMPurify from 'dompurify'

const allowedCssProperties = ['border', 'border-spacing', 'padding', 'margin', 'text-align', 'width']

const isCssFunction = value => /\w\(/.test(value)

const sanitizeInlineStyle = styles =>
  allowedCssProperties
    .map(prop => {
      const value = styles[prop]
      return value && typeof value === 'string' && !isCssFunction(value) ? `${prop}:${value};` : null
    })
    .filter(Boolean)
    .join('')

const handleAfterSanitizeAttributes = node => {
  if (node && typeof node.hasAttribute === 'function' && node.hasAttribute('style')) {
    const sanitizedStyle = sanitizeInlineStyle(node.style)
    if (sanitizedStyle) {
      node.setAttribute('style', sanitizedStyle)
    } else {
      node.removeAttribute('style')
    }
  }

  return node
}

DOMPurify.addHook('afterSanitizeAttributes', handleAfterSanitizeAttributes)

/**
 * Does not allow javascript and styles, except some whitelisted inline styles.
 * @param {*} html
 * @returns sanitized html
 */
const sanitizeHtml = html => {
  if (!html) {
    return html
  }

  return DOMPurify.sanitize(html, {FORBID_TAGS: ['style'], ADD_ATTR: ['target']})
}

export default sanitizeHtml
