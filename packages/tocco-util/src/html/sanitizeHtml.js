import DOMPurify from 'dompurify'

const sanitizeHtml = html => {
  if (!html) {
    return html
  }
  return DOMPurify.sanitize(html, {FORBID_TAGS: ['style'], FORBID_ATTR: ['style']})
}

export default sanitizeHtml
