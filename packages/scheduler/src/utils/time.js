/**
 * Returns the hour as string
 *
 * @param {Object} moment.js datetime
 *
 * @return {String} Hours of datetime e.g. '08' or '8 PM' depending on the locale set on the moment.js object
 */
export const getFormattedTime = date => date.format('LT').replace(/(:|\.|e)[0-9]{2}/, '')
