/* eslint no-console: 0 */

export const log = (...args) => {
  if (window.console) {
    console.log(...args)
  }
}

export const logError = (...args) => {
  if (window.console) {
    const log = console.error || console.log
    log(...args)
  }
}

export const logWarning = (...args) => {
  if (window.console) {
    const log = console.warn || console.log
    log(...args)
  }
}
