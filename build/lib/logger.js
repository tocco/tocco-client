/* eslint-disable no-console */
import chalk from 'chalk'
import figures from 'figures'

const log = console.log.bind(console)

const error = (...messages) => {
  console.error(chalk.red.apply(chalk, [figures.cross].concat(messages)))
}

const info = (...messages) => {
  console.info(chalk.cyan.apply(chalk, [figures.info].concat(messages)))
}

const success = (...messages) => {
  console.log(chalk.green.apply(chalk, [figures.tick].concat(messages)))
}

const warn = (...messages) => {
  console.warn(chalk.yellow.apply(chalk, [figures.warning].concat(messages)))
}

export default {log, error, info, success, warn}
