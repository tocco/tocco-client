/* eslint-disable no-console */

const consoleLog = (...msg) => {
  console.log(...msg)
  return null
}

const consoleError = (...msg) => {
  console.error(...msg)
  return null
}

module.exports = {
  consoleLog,
  consoleError
}
