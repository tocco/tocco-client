import {rest} from 'tocco-app-extensions'
import {viewPersistor} from 'tocco-util'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'

import * as sagas from './sagas'
import {loadCurrentRoute} from './actions'
import {deriveBreadcrumbs, deriveCurrentViewInfo, initMultiRelations, loadRouteInfo} from './sagas'
import * as actions from './actions'

describe('admin', () => {
  describe('routes', () => {
    describe('entities', () => {
      describe('modules', () => {
        describe('path', () => {
          describe('sagas', () => {
            const mockData = {
              userModel: {
                label: 'Person',
                name: 'User',
                paths: {
                  relAddress_user: {}
                }
              },
              userDisplay: 'Peter Lustig',
              addressModel: {
                label: 'Adresse',
                name: 'Address'
              },
              addressDisplay: 'Street 1'
            }

            describe('loadRoute', () => {
              test('should dispatch currentViewInfo and breadcrumbs, clear views and spawn initMultiRelations', () => {
                const pathname = '/e/User/1/detail'
                const routeInfo = [{type: 'list'}, {type: 'detail'}]

                const breadcrumbs = []

                const currentViewInfo = {
                  type: 'detail',
                  level: 1,
                  key: 1,
                  model: {name: 'User'}
                }

                return expectSaga(sagas.loadRoute, loadCurrentRoute({pathname}))
                  .provide([
                    [matchers.call.fn(loadRouteInfo), routeInfo],
                    [matchers.call.fn(deriveCurrentViewInfo), currentViewInfo],
                    [matchers.call.fn(deriveBreadcrumbs), breadcrumbs],
                    [matchers.spawn.fn(initMultiRelations), null]
                  ])
                  .put(actions.setCurrentViewInfo(pathname, currentViewInfo))
                  .put(actions.setBreadcrumbsInfo(breadcrumbs))
                  .call(viewPersistor.clearPersistedViews, 2)
                  .spawn(initMultiRelations, currentViewInfo.model, currentViewInfo.key)
                  .run()
              })

              test('should not spawn initMultiRelations if route info contains an error', () => {
                const currentViewInfo = {
                  type: 'detail',
                  level: 1,
                  error: {key: '1'}
                }

                return expectSaga(sagas.loadRoute, loadCurrentRoute(''))
                  .provide([
                    [matchers.call.fn(loadRouteInfo), []],
                    [matchers.call.fn(deriveCurrentViewInfo), currentViewInfo],
                    [matchers.call.fn(deriveBreadcrumbs)]
                  ])
                  .not.spawn(initMultiRelations, currentViewInfo.model, currentViewInfo.key)
                  .run()
              })
            })

            describe('loadRouteInfo', () => {
              const modelDisplayProvider = {
                call(effect, next) {
                  if (effect.fn === rest.fetchModel) {
                    const entityName = effect.args[0]
                    return entityName === 'User' ? mockData.userModel : mockData.addressModel
                  }

                  if (effect.fn === rest.fetchDisplay) {
                    const [entityName] = effect.args
                    return entityName === 'User' ? mockData.userDisplay : mockData.addressDisplay
                  }

                  if (effect.fn === rest.entityExists) {
                    return true
                  }

                  return next()
                }
              }

              test('should return routeInfo [2] containing list and detail info', () => {
                const pathname = '/e/User/1/detail'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.userModel
                  },
                  {
                    type: 'detail',
                    key: '1',
                    model: mockData.userModel,
                    display: mockData.userDisplay
                  }
                ]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return routeInfo [4] containing relations', () => {
                const pathname = '/e/User/1226/relAddress_user/224/detail'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.userModel

                  },
                  {
                    type: 'detail',
                    key: '1226',
                    model: mockData.userModel,
                    display: mockData.userDisplay
                  },
                  {
                    type: 'list',
                    model: mockData.addressModel,
                    relationName: 'relAddress_user',
                    parent: {
                      type: 'detail',
                      key: '1226',
                      model: mockData.userModel,
                      display: mockData.userDisplay
                    }
                  },
                  {
                    type: 'detail',
                    model: mockData.addressModel,
                    key: '224',
                    display: 'Street 1',
                    relationName: 'relAddress_user',
                    parent: {
                      type: 'detail',
                      key: '1226',
                      model: mockData.userModel,
                      display: mockData.userDisplay
                    }
                  }]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return routeInfo for list actions', () => {
                const pathname = '/e/User/action/input-edit'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.userModel
                  },
                  {
                    type: 'action',
                    actionId: 'input-edit'
                  }
                ]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return routeInfo for detail actions', () => {
                const pathname = '/e/Address/983/action/input-edit'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.addressModel
                  },
                  {
                    type: 'detail',
                    key: '983',
                    model: mockData.addressModel,
                    display: mockData.addressDisplay
                  },
                  {
                    type: 'action',
                    actionId: 'input-edit'
                  }
                ]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return create', () => {
                const pathname = '/e/User/create'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.userModel

                  },
                  {
                    type: 'create',
                    model: mockData.userModel,
                    parent: undefined,
                    relationName: undefined
                  }]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return create for relation path', () => {
                const pathname = '/e/User/1226/relAddress_user/create'

                const expectedResult = [
                  {
                    type: 'list',
                    model: mockData.userModel

                  },
                  {
                    type: 'detail',
                    key: '1226',
                    model: mockData.userModel,
                    display: mockData.userDisplay
                  },
                  {
                    type: 'list',
                    model: mockData.addressModel,
                    relationName: 'relAddress_user',
                    parent: {
                      type: 'detail',
                      key: '1226',
                      model: mockData.userModel,
                      display: mockData.userDisplay
                    }
                  },
                  {
                    type: 'create',
                    model: mockData.addressModel,
                    parent: {
                      type: 'detail',
                      key: '1226',
                      model: mockData.userModel,
                      display: mockData.userDisplay
                    },
                    relationName: 'relAddress_user'
                  }]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide(modelDisplayProvider)
                  .returns(expectedResult)
                  .run()
              })

              test('should return only action id for action route [1]', () => {
                const pathname = '/e/action/input-edit'
                const expectedResult = [{
                  type: 'action',
                  actionId: 'input-edit'
                }]

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .returns(expectedResult)
                  .run()
              })

              test('should return and empty array for an invalid path', () => {
                const pathname = '/e/invalid-url'

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .returns([])
                  .run()
              })

              test('should return an error if entity model can not be loaded', () => {
                const pathname = '/e/UserAA/12261111111/detail'

                return expectSaga(sagas.loadRouteInfo, pathname)
                  .provide([
                    [matchers.call.fn(sagas.fetchModel), throwError('')]

                  ])
                  .returns([{type: 'list', error: {entityName: 'UserAA'}}])
                  .run()
              })

              test('should return an error if display can not be loaded of an entity', async() => {
                const pathname = '/e/User/12261111111/detail'

                const result = await expectSaga(sagas.loadRouteInfo, pathname)
                  .provide([
                    [matchers.call.fn(sagas.entityExists), false],
                    [matchers.call.fn(rest.fetchModel), mockData.userModel]
                  ])

                  .run()

                expect(result.returnValue[1]).to.eql(
                  {type: 'detail', error: {key: '12261111111', entityName: 'Person'}}
                )
              })
            })

            describe('deriveBreadcrumbs', () => {
              test('should return breadcrumbs array with display and path', () => {
                const routeInfo = [
                  {type: 'list', model: mockData.userModel},
                  {type: 'detail', key: '1', display: mockData.userDisplay, model: mockData.userModel},
                  {type: 'list', relationName: 'relAddress', model: mockData.addressModel},
                  {type: 'detail', key: '99', model: mockData.addressModel, display: mockData.addressDisplay}
                ]

                const expectedResult = [
                  {display: 'Person', path: 'User/list', type: 'list'},
                  {display: mockData.userDisplay, path: 'User/1/detail', type: 'detail'},
                  {display: 'Adresse', path: 'User/1/relAddress/list', type: 'list'},
                  {display: mockData.addressDisplay, path: 'User/1/relAddress/99/detail', type: 'detail'}]

                const result = sagas.deriveBreadcrumbs(routeInfo)

                expect(result).to.eql(expectedResult)
              })

              test('should ignore actions', () => {
                const routeInfo = [
                  {type: 'list', model: mockData.userModel},
                  {type: 'action', actionId: 'resourcescheduler'}
                ]

                const expectedResult = [
                  {display: 'Person', path: 'User/list', type: 'list'}
                ]

                const result = sagas.deriveBreadcrumbs(routeInfo)

                expect(result).to.eql(expectedResult)
              })
            })

            describe('deriveCurrentViewInfo', () => {
              test('should return object with all relevant infos for the current view', () => {
                const routeInfo = [
                  {type: 'list', model: mockData.userModel},
                  {type: 'detail', key: '1', display: mockData.userDisplay, model: mockData.userModel},
                  {type: 'list', relationName: 'relAddress', model: mockData.addressModel},
                  {type: 'detail', key: '99', model: mockData.addressModel, display: mockData.addressDisplay}
                ]

                const pathname = 'User/1/relAddress/99/detail'

                const expectedResult = {
                  display: mockData.addressDisplay,
                  key: '99',
                  level: 3,
                  model: mockData.addressModel,
                  pathname,
                  type: 'detail'
                }

                const result = sagas.deriveCurrentViewInfo(pathname, routeInfo)

                expect(result).to.eql(expectedResult)
              })
            })
          })
        })
      })
    })
  })
})
