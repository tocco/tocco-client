import fs from 'fs'

import config from '../../config/index'

const paths = config.utils_paths

export const readFile = path => {
  if (fs.existsSync(path)) {
    const buffer = fs.readFileSync(path)
    return buffer.toString()
  }
  return ''
}

export const getAllDirectories = path =>
  fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isDirectory())

export function getAllPackages() {
  const path = paths.client('packages')
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory()
  })
}

export function packagesExists(packageName) {
  const availablePackages = getAllPackages()

  return availablePackages.indexOf(packageName) > -1
}
