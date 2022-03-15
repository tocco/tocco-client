import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'

import {enhanceEntityWithDisplays} from './functions'

describe('enhanceEntityWithDisplays', () => {
  test('do not load display of null entities', () => {
    const entity = {
      __key: '1',
      __model: 'User',
      'relSingle_entity1.relMulti_entity1.relSingle_entity2': [null],
      'relSingle_entity1.relSingle_entity2': null,
      relMulti_entity2: [
        {
          model: 'Multi_entity2',
          key: '11'
        }
      ],
      relSingle_entity3: {
        model: 'Single_entity3',
        key: '22'
      }
    }

    const displays = {
      Single_entity3: {
        22: 'Single Entity 3 Display'
      }
    }

    const fieldDefinitions = [
      {
        path: 'relSingle_entity1.relMulti_entity1.relSingle_entity2',
        dataType: 'single-select-box'
      },
      {
        path: 'relSingle_entity1.relSingle_entity2',
        dataType: 'single-select-box'
      },
      {
        path: 'relSingle_entity3',
        dataType: 'single-select-box'
      }
    ]

    const passedEntity = {...entity}
    expectSaga(enhanceEntityWithDisplays, passedEntity, fieldDefinitions)
      .provide([[matchers.call.fn(rest.fetchDisplays), displays]])
      .run()

    const expectedEntity = {
      ...entity,
      relSingle_entity3: {
        ...entity.relSingle_entity3,
        display: 'Single Entity 3 Display'
      },
      'relSingle_entity1.relMulti_entity1.relSingle_entity2': []
    }
    expect(passedEntity).to.eql(expectedEntity)
  })
})
