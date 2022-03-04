import fs from 'fs'

import {getAllPackages, getPackageDirectory} from '../build/lib/packages'
import config from '../config'

const paths = config.utils_paths
export const ROOT_DISPLAY = '- (Root)'

export const prompts = {
  package: {
    type: 'rawlist',
    name: 'package',
    message: 'Package Name',
    choices: getAllPackages()
  },
  route: {
    type: 'list',
    name: 'route',
    message: 'Route',
    when: answers => hasRoutes(answers.package),
    choices: answers => {
      const routes = getRoutes(answers.package)
      return [ROOT_DISPLAY, ...routes]
    }
  },
  module: {
    type: 'list',
    name: 'module',
    message: 'Module',
    choices: answers => {
      const modules = getModules(answers.package, answers.route)
      return [ROOT_DISPLAY, ...modules]
    }
  }
}

export const hasRoutes = packageName => {
  const packageDir = getPackageDirectory(packageName)
  const path = paths.client(`${packageDir}/src/routes`)
  return fs.existsSync(path)
}

export const getRoutes = packageName => {
  const packageDir = getPackageDirectory(packageName)
  const path = paths.client(`${packageDir}/src/routes`)
  if (fs.existsSync(path)) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path + '/' + file).isDirectory()
    })
  }
  return []
}

export const getModules = (packageName, route) => {
  const baseModulePath = getPath(packageName, route) + '/modules'

  const path = paths.client(baseModulePath)
  if (fs.existsSync(path)) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path + '/' + file).isDirectory()
    })
  }
  return []
}

export const getPath = (packageName, route = '', module = '') => {
  const packageDir = getPackageDirectory(packageName)
  let path = `${packageDir}/src`
  if (route && route !== ROOT_DISPLAY) {
    path += `/routes/${route}`
  }

  if (module) {
    path += '/modules'
    if (module !== ROOT_DISPLAY) {
      path += `/${module}`
    }
  }

  return path
}
