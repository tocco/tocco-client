import {call, put, select, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import parseUrl from '../../../util/parseUrl'
import {fetchModel} from '../../../util/api/entities'
import doShowBackButton from '../../../util/showBackButton'
import detail from '../../../util/detail'

describe('entity-browser', () => {
  describe('routes', () => {
    describe('detail', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.LOAD_DETAIL_PARAMS, sagas.loadEntityDetail),
              takeLatest(actions.CLEAR_DETAIL_PARAMS, sagas.clearDetailParams)
            ]))
            expect(generator.next().done).to.be.true
          })

          describe('clearDetailParams saga', () => {
            test('set undefined detail params', () => {
              const gen = sagas.clearDetailParams()

              expect(gen.next().value).to.eql(put(actions.setDetailParams(undefined)))
              expect(gen.next().done).to.be.true
            })
          })

          describe('loadEntityDetail saga', () => {
            test('should set dispatch DetailParams object', () => {
              const entityName = 'User'
              const formBase = 'UserSearch'

              const modelPaths = ['relDummySubGrid']
              const entityId = 3
              const parentUrl = `${entityName}/1`
              const targetEntityName = 'Dummy_Entity'
              const initialKey = '1'
              const mode = 'update'
              const url = `${parentUrl}/${modelPaths[0]}/${entityId}`
              const showBackButton = true
              const expectedFormName = `${formBase}_${targetEntityName}`

              const expectedDetailParams = {
                mode,
                entityName: targetEntityName,
                entityId,
                formName: expectedFormName,
                showBackButton,
                parentUrl
              }

              const gen = sagas.loadEntityDetail(actions.loadDetailParams(url))
              expect(gen.next().value).to.eql(call(parseUrl, url))
              expect(gen.next({modelPaths, entityId, parentUrl}).value).to.eql(select(sagas.entityBrowserSelector))
              expect(gen.next({entityName, formBase}).value).to.eql(call(detail.getMode, entityId))
              expect(gen.next(mode).value).to.eql(call(sagas.getTargetEntity, entityName, modelPaths))
              expect(gen.next(targetEntityName).value).to.eql(select(sagas.inputSelector))
              expect(gen.next({initialKey}).value).to.eql(call(doShowBackButton, initialKey, modelPaths))
              expect(gen.next(showBackButton).value).to.eql(put(actions.setDetailParams(expectedDetailParams)))

              expect(gen.next().done).to.be.true
            })
          })

          describe('getTargetEntity saga', () => {
            test('should return getTargetEntity', () => {
              const entityName = 'User'
              const dummyEntity = 'Dummy_Entity'
              const modelPaths = ['relDummySubGrid', 'relDummy2']
              const expectedTargetEntity = 'Dummy2'

              const modelUser = {
                relDummySubGrid: {
                  targetEntity: dummyEntity
                }
              }

              const modelDummyEntity = {
                relDummy2: {
                  targetEntity: expectedTargetEntity
                }
              }

              const gen = sagas.getTargetEntity(entityName, modelPaths)
              expect(gen.next().value).to.eql(call(fetchModel, entityName))
              expect(gen.next(modelUser).value).to.eql(call(fetchModel, dummyEntity))

              const next = gen.next(modelDummyEntity)
              expect(next.value).to.be.eql(expectedTargetEntity)
              expect(next.done).to.be.true
            })
          })
        })
      })
    })
  })
})
