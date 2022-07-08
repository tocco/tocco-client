import {getTitle} from './Breadcrumbs'

describe('tocco-ui', () => {
  describe('Breadcrumbs', () => {
    describe('getTitle', () => {
      const createTitle = 'Create'

      const userList = {
        display: 'User',
        path: 'User/list',
        type: 'list'
      }

      const userDetail = {
        display: 'Firstname Lastname',
        path: 'User/1/detail',
        type: 'detail'
      }

      const nestedAddressUserList = {
        display: 'Address-User',
        path: 'User/1/relAddressUser/list',
        type: 'list'
      }

      test('get title for create view', () => {
        const breadcrumbsInfo = [
          userList,
          {
            display: 'User',
            path: 'User/User/create',
            type: 'create'
          }
        ]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('User - Create')
      })

      test('get title for create nested view', () => {
        const breadcrumbsInfo = [
          userList,
          userDetail,
          nestedAddressUserList,
          {
            display: 'Address-User',
            path: 'User/1/relAddressUser/relAddressUser/create',
            type: 'create'
          }
        ]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Address-User - Create')
      })

      test('get title for list', () => {
        const breadcrumbsInfo = [userList]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('User')
      })

      test('get title for nested list', () => {
        const breadcrumbsInfo = [userList, userDetail, nestedAddressUserList]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Address-User')
      })

      test('get title for detail', () => {
        const breadcrumbsInfo = [userList, userDetail]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('User - Firstname Lastname')
      })

      test('get title for nested detail', () => {
        const breadcrumbsInfo = [
          userList,
          userDetail,
          nestedAddressUserList,
          {
            display: 'Street, Zip City',
            path: 'User/1/relAddressUser/1/detail',
            type: 'detail'
          }
        ]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Address-User - Street, Zip City')
      })

      test('get title for other page', () => {
        const breadcrumbsInfo = [
          {
            display: 'Home'
          }
        ]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Home')
      })

      test('get title for other nested page', () => {
        const breadcrumbsInfo = [
          userList,
          {
            display: 'Merge'
          }
        ]
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Merge')
      })

      test('get title is breadcrumbsInfo is empty', () => {
        const breadcrumbsInfo = []
        expect(getTitle(breadcrumbsInfo, createTitle)).to.be.equal('Tocco')
      })
    })
  })
})
