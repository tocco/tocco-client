import {exec} from 'child_process'
import path from 'path'

import dotenv from 'dotenv'
import {argv} from 'yargs'

import logger from '../lib/logger'
import {getAllDirectories, getPackageDirectory, packagesExists, readFile} from '../lib/packages'

const {parsed: envs} = dotenv.config({path: './.env'})

const defaultModule = 'core/web-core'
const packageToNice2ModuleMap = {
  'resource-scheduler': 'optional/resourcescheduler',
  'docs-browser': 'core/dms',
  devcon: 'core/devcon'
}
const nice2PropertiesPath = '/boot/src/main/resources/ch/tocco/nice2/boot/impl/default.properties'

const getNice2Module = packageName => packageToNice2ModuleMap[packageName] || defaultModule

const getNice2Folder = () => {
  const basePath = envs.NICE2_REPO_BASE_PATH
  if (!basePath) {
    throw new Error("Environment variable 'NICE2_REPO_BASE_PATH' not defined. Cannot find correct nice2 folder")
  }
  const currentNiceVersion = readFile('./nice-current-version.txt')
  const propertiesNiceVersion = currentNiceVersion.replace(/\.0\s*$/, '')

  const niceDirs = getAllDirectories(basePath)
  const niceDir = niceDirs.find(dir => {
    const properties = readFile(path.join(basePath, dir, nice2PropertiesPath))
    return properties.includes(`nice.version=${propertiesNiceVersion}`)
  })

  return path.join(basePath, niceDir)
}

const copyPackage = () => {
  const packageName = argv.package
  if (!packageName || !packagesExists(packageName)) {
    logger.error('Please select a valid package with --package={PACKAGE_NAME} parameter.')
    process.exit(1)
  }

  const packageDir = getPackageDirectory(packageName)
  const nice2Module = getNice2Module(packageName)
  const nice2Folder = getNice2Folder()
  logger.info(`Copy package '${packageName}' to nice2 into '${nice2Module}' inside '${nice2Folder}'`)

  exec(
    // eslint-disable-next-line max-len
    `cp -r ${packageDir}/dist/* ${nice2Folder}/${nice2Module}/resources/resources/webapp/node_modules/tocco-${packageName}/dist`,
    (error, stdout, stderr) => {
      if (error) {
        logger.error(error)
      }

      if (stderr) {
        logger.error(stderr)
      }
      if (stdout) {
        logger.info(stdout)
      }

      logger.success(
        // eslint-disable-next-line max-len
        `Copied '${packageDir}/dist/*' to '${nice2Folder}/${nice2Module}/resources/resources/webapp/node_modules/tocco-${packageName}/dist'`
      )
    }
  )
}

copyPackage()
