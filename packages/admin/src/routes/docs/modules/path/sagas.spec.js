import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {select, call, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as sagas from './sagas'
import * as actions from './actions'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('path', () => {
          describe('sagas', () => {
            describe('main saga', () => {
              test('should fork sagas', () => {
                const saga = testSaga(sagas.default)
                saga.next().all([
                  takeLatest(actions.LOAD_BREADCRUMBS, sagas.loadBreadcrumbs)
                ])
              })
            })

            describe('loadBreadcrumbs', () => {
              test('should load root breadcrumbs', () => {
                const pathname = '/docs'
                const breadcrumbs = [{display: 'root'}]

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {}],
                    [call(rest.requestSaga, 'documents/breadcrumbs'), {
                      body: {breadcrumbs}
                    }]
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })

              test('should load breadcrumbs of node', () => {
                const pathname = '/docs/folder/45/list'
                const breadcrumbs = [{display: 'root'}, {display: 'item 1'}, {display: 'item 2'}]

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {}],
                    [call(rest.requestSaga, 'documents/Folder/45/breadcrumbs'), {
                      body: {breadcrumbs}
                    }]
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })

              test('should load search breadcrumbs', () => {
                const pathname = '/docs/folder/45/list'
                const breadcrumbs = [{
                  display: 'Dokument',
                  path: '',
                  type: 'list'
                }, {
                  display: 'Suchresultate',
                  path: '',
                  type: 'list'
                }]

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {
                      searchMode: true
                    }],
                    [select(sagas.textResourceSelector, 'client.admin.docs.breadcrumbs.start'), 'Dokument'],
                    [select(sagas.textResourceSelector, 'client.admin.breadcrumbs.searchResults'), 'Suchresultate']
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })
            })
          })
        })
      })
    })
  })
})
