import * as relationEntitiesActions from './actions'
import {call, put, select} from 'redux-saga/effects'
import {fetchEntities} from 'tocco-util/src/rest'

import * as sagas from './sagas'

describe('loadRelationEntity saga', () => {
  it('should load relation entities ', () => {
    const entityName = 'User'

    const entities = [{display: 'User1', key: 1}]
    const transformedEntities = [{key: 1, display: 'User1'}]
    const gen = sagas.loadRelationEntity(relationEntitiesActions.loadRelationEntity(entityName))
    expect(gen.next().value).to.eql(select(sagas.selector))
    expect(gen.next({relationEntities: {}}).value)
      .to.eql(call(fetchEntities, entityName, {}, sagas.selectEntitiesTransformer))
    expect(gen.next(entities).value)
      .to.eql(put(relationEntitiesActions.setRelationEntity(entityName, transformedEntities, true)))
    expect(gen.next().value).to.eql(put(relationEntitiesActions.setRelationEntityLoaded(entityName)))
    expect(gen.next().done).to.be.true
  })

  it('should not load entities if already loaded', () => {
    const entityName = 'User'

    const state = {
      relationEntities: {
        User: {
          loaded: true
        }
      }
    }

    const gen = sagas.loadRelationEntity(relationEntitiesActions.loadRelationEntity(entityName))
    expect(gen.next().value).to.eql(select(sagas.selector))
    expect(gen.next(state).done).to.be.true
  })
})
