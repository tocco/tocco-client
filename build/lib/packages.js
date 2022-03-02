import fs from 'fs'

import config from '../../config/index.js'

const paths = config.utils_paths

const getAllDirectories = path => fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isDirectory())

export function getAllPackages() {
  const path = paths.client('packages')

  const rootDirs = getAllDirectories(path)
  return rootDirs.reduce((acc, directory) => {
    const packages = getAllDirectories(`${path}/${directory}`)
    return [...acc, ...packages]
  }, [])
}

export function getPackageDirectory(packageName) {
  const path = paths.client('packages')
  const rootDirs = getAllDirectories(path)
  const rootDir = rootDirs.find(dir => getAllDirectories(`${path}/${dir}`).includes(packageName))
  return rootDir ? `packages/${rootDir}/${packageName}` : null
}

export function packagesExists(packageName) {
  const availablePackages = getAllPackages()

  return availablePackages.indexOf(packageName) > -1
}
