import {getEntryFilePath} from './utils'

describe('tocco-util', () => {
  describe('bundle', () => {
    describe('utils', () => {
      describe('getEntryFilePath', () => {
        test('should handle different appName', () => {
          const packageName = 'package'
          const appName = 'app'

          const path = getEntryFilePath(packageName, appName)

          expect(path).to.eql('/js/tocco-package/dist/app.js')
        })

        test('should use index when package and app names are same', () => {
          const packageName = 'package'
          const appName = 'package'

          const path = getEntryFilePath(packageName, appName)

          expect(path).to.eql('/js/tocco-package/dist/index.js')
        })
      })
    })
  })
})
