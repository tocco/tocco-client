import reducer from './reducer'
import * as actions from './actions'

const initialState = {
  currentViewInfos: {},
  breadcrumbsInfo: [],
  relations: null,
  relationsInfo: {},
  selectedRelation: null
}

describe('admin', () => {
  describe('routes', () => {
    describe('entities', () => {
      describe('modules', () => {
        describe('path', () => {
          describe('reducer', () => {
            describe('main', () => {
              test('should create a valid initial state', () => {
                expect(reducer(undefined, {})).to.deep.equal(initialState)
              })
            })
      
            describe('updateBreadcrumbsInfo', () => {
              test('should update breadcrumbs info for defined path', () => {
                const stateBefore = {
                  ...initialState,
                  breadcrumbsInfo: [
                    {
                      path: 'a',
                      display: 'foo'
                    },
                    {
                      path: 'b',
                      display: 'bar'
                    }
                  ]
                }
                const expectedStateAfter = {
                  ...stateBefore,
                  breadcrumbsInfo: [
                    {
                      path: 'a',
                      display: 'foo'
                    },
                    {
                      path: 'b',
                      display: 'test',
                      any: 'asdf'
                    }
                  ]
                }

                const path = 'b'
                const breadcrumbsInfo = {display: 'test', any: 'asdf'}
      
                expect(reducer(stateBefore, actions.updateBreadcrumbsInfo(path, breadcrumbsInfo)))
                  .to.deep.equal(expectedStateAfter)
              })

              test('should ignore breadcrumbs info if not exists yet', () => {
                const stateBefore = {
                  ...initialState,
                  breadcrumbsInfo: [
                    {
                      path: 'a',
                      display: 'foo'
                    }
                  ]
                }
                const expectedStateAfter = {
                  ...stateBefore,
                  breadcrumbsInfo: [
                    {
                      path: 'a',
                      display: 'foo'
                    }
                  ]
                }

                const path = 'b'
                const breadcrumbsInfo = {display: 'test', any: 'asdf'}
      
                expect(reducer(stateBefore, actions.updateBreadcrumbsInfo(path, breadcrumbsInfo)))
                  .to.deep.equal(expectedStateAfter)
              })
            })

            describe('setCurrentViewInfo', () => {
              test('should set current view info', () => {
                const stateBefore = {
                  ...initialState,
                  currentViewInfos: {
                    '/e/a': {
                      dispay: 'foo',
                      title: 'foo'
                    }
                  }
                }
                const expectedStateAfter = {
                  ...stateBefore,
                  currentViewInfos: {
                    '/e/a': {
                      dispay: 'foo',
                      title: 'foo'
                    },
                    '/e/b': {
                      dispay: 'bar',
                      title: 'bar'
                    }
                  }
                }

                const location = '/e/b'
                const currentViewInfo = {dispay: 'bar', title: 'bar'}
      
                expect(reducer(stateBefore, actions.setCurrentViewInfo(location, currentViewInfo)))
                  .to.deep.equal(expectedStateAfter)
              })

              test('should update current view info', () => {
                const stateBefore = {
                  ...initialState,
                  currentViewInfos: {
                    '/e/a': {
                      dispay: 'foo',
                      title: 'foo'
                    },
                    '/e/b': {
                      dispay: 'bar',
                      title: 'bar'
                    }
                  }
                }
                const expectedStateAfter = {
                  ...stateBefore,
                  currentViewInfos: {
                    '/e/a': {
                      dispay: 'foo',
                      title: 'foo'
                    },
                    '/e/b': {
                      dispay: 'test',
                      title: 'bar'
                    }
                  }
                }

                const location = '/e/b'
                const currentViewInfo = {dispay: 'test'}
      
                expect(reducer(stateBefore, actions.setCurrentViewInfo(location, currentViewInfo)))
                  .to.deep.equal(expectedStateAfter)
              })
            })
          })
        })
      })
    })
  })
})
