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
                const options = {queryParams: {rootnodes: null}}

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {}],
                    [select(sagas.rootNodesSelector), null],
                    [call(rest.requestSaga, 'documents/breadcrumbs', options), {
                      body: {breadcrumbs}
                    }]
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })

              test('should load breadcrumbs of node', () => {
                const pathname = '/docs/folder/45/list'
                const breadcrumbs = [{display: 'root'}, {display: 'item 1'}, {display: 'item 2'}]
                const options = {queryParams: {rootnodes: null}}

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {}],
                    [select(sagas.rootNodesSelector), null],
                    [call(rest.requestSaga, 'documents/Folder/45/breadcrumbs', options), {
                      body: {breadcrumbs}
                    }]
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })

              test('should load breadcrumbs with root nodes', () => {
                const pathname = '/docs/folder/45/list'
                const breadcrumbs = [{display: 'root'}, {display: 'item 2'}]
                const options = {queryParams: {rootnodes: 'Folder/25,Folder/38'}}

                return expectSaga(sagas.loadBreadcrumbs, actions.loadBreadcrumbs(pathname))
                  .provide([
                    [select(sagas.docsPathSelector), {}],
                    [select(sagas.rootNodesSelector), [{
                      entityName: 'Folder',
                      key: '25'
                    }, {
                      entityName: 'Folder',
                      key: '38'
                    }]],
                    [call(rest.requestSaga, 'documents/Folder/45/breadcrumbs', options), {
                      body: {breadcrumbs}
                    }]
                  ])
                  .put(actions.setBreadcrumbs(breadcrumbs))
                  .run()
              })

              test('should load search breadcrumbs', () => {
                const pathname = '/docs/'
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
                    [select(sagas.textResourceSelector, 'client.docs-browser.breadcrumbs.start'), 'Dokument'],
                    [
                      select(sagas.textResourceSelector, 'client.docs-browser.breadcrumbs.searchResults'),
                      'Suchresultate'
                    ]
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
