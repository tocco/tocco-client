/**
 * Removes HTML Tags and returns a formatting neutral string
 */
export const adjustedHTMLString = html => (
  html ? html.replace(/&shy;/g, '') : html
)
