import {getPathInfo} from './url'

describe('admin', () => {
  describe('routes', () => {
    describe('entities', () => {
      describe('utils', () => {
        describe('url', () => {
          describe('getPathInfo', () => {
            test('should return null for invalid url', () => {
              const result = getPathInfo('/e/some-url')
              expect(result).to.be.null
            })

            test('should return object entity name and key', () => {
              const pathname = '/e/User/13/detail'
              const expectedResult = {
                actionId: undefined,
                entity: 'User',
                key: '13',
                relation: undefined,
                view: 'detail'
              }
              const result = getPathInfo(pathname)
              expect(result).to.eql(expectedResult)
            })

            test('should return object with relation part', () => {
              const pathname = '/e/User/13/relSingle_user_membership/8888/detail'
              const expectedResult = {
                actionId: undefined,
                entity: 'User',
                key: '13',
                relation: 'relSingle_user_membership/8888',
                view: 'detail'
              }
              const result = getPathInfo(pathname)
              expect(result).to.eql(expectedResult)
            })

            test('should return object for action urls', () => {
              const pathname = '/e/action/resource-scheduler'
              const expectedResult = {
                actionId: 'resource-scheduler'
              }
              const result = getPathInfo(pathname)
              expect(result).to.eql(expectedResult)
            })
          })
        })
      })
    })
  })
})
