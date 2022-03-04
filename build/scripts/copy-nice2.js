import {exec} from 'child_process'

import dotenv from 'dotenv'
import {argv} from 'yargs'

import logger from '../lib/logger'
import {getPackageDirectory, packagesExists} from '../lib/packages'

const {parsed: envs} = dotenv.config({path: './.nice2.env'})

const defaultModule = 'core/web-core'
const packageToNice2ModuleMap = {
  'resource-scheduler': 'optional/resourcescheduler',
  'docs-browser': 'core/dms',
  devcon: 'core/devcon'
}

const getNice2Module = packageName => packageToNice2ModuleMap[packageName] || defaultModule

// TODO: @isbo create "deploy-all-packages" script

const copyPackage = () => {
  const packageName = argv.package
  if (!packageName || !packagesExists(packageName)) {
    logger.error('Please select a valid package with --package={PACKAGE_NAME} parameter.')
    process.exit(1)
  }

  const packageDir = getPackageDirectory(packageName)
  const nice2Module = getNice2Module(packageName)
  logger.info(`Copy package '${packageName}' to nice2 into '${nice2Module}'`)

  exec(
    // eslint-disable-next-line max-len
    `cp -r ./${packageDir}/dist/* ${envs.NICE2_REPO}/${nice2Module}/resources/resources/webapp/node_modules/tocco-${packageName}/dist`,
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

      logger.success('Copied!')
    }
  )
}

copyPackage()
