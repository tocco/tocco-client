import fs from 'fs'
import config from '../config'

const paths = config.utils_paths

export function getAllPackages() {
  var path = paths.client('packages')
  return fs.readdirSync(path).filter(function(file) {
    return fs.statSync(path + '/' + file).isDirectory()
  })
}

export function packagesExists(packageName) {
  var availablePackages = getAllPackages()

  return availablePackages.indexOf(packageName) > -1
}
