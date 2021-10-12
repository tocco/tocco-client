import DOMPurify from 'dompurify'

const sanitizeHtml = html => {
  if (!html) {
    return html
  }
  return DOMPurify.sanitize(html)
}

export default sanitizeHtml
