import fs from 'fs'
import config from '../config'
import {getAllPackages} from '../bin/packages'

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
    when: answers => (hasRoutes(answers.package)),
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
  const path = paths.client(`packages/${packageName}/src/routes`)
  return fs.existsSync(path)
}

export const getRoutes = packageName => {
  const path = paths.client(`packages/${packageName}/src/routes`)
  if (fs.existsSync(path)) {
    return fs.readdirSync(path).filter(function(file) {
      return fs.statSync(path + '/' + file).isDirectory()
    })
  }
  return []
}

export const getModules = (packageName, route) => {
  let baseModulePath = getPath(packageName, route) + '/modules'

  const path = paths.client(baseModulePath)
  if (fs.existsSync(path)) {
    return fs.readdirSync(path).filter(function(file) {
      return fs.statSync(path + '/' + file).isDirectory()
    })
  }
  return []
}

export const getPath = (packageName, route = '', module = '') => {
  let path = `packages/${packageName}/src`
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
