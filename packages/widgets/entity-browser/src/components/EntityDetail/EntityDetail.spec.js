import {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import {MemoryRouter} from 'react-router-dom'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {IntlStub} from 'tocco-test-util'

import EntityDetail from './EntityDetail'
import {setupFetchMock} from './mockData/setupFetchMock'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityDetail', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      test('should render App ', () => {
        const detailParams = {
          entityName: 'User',
          entityId: '1',
          formName: 'User',
          mode: 'update'
        }

        setupFetchMock(fetchMock)

        const wrapper = mount(
          <MemoryRouter>
            <EntityDetail
              loadDetailParams={EMPTY_FUNC}
              dispatchEmittedAction={EMPTY_FUNC}
              clearDetailParams={EMPTY_FUNC}
              setFormTouched={EMPTY_FUNC}
              intl={IntlStub}
              detailParams={detailParams}
            />
          </MemoryRouter>
        )

        expect(wrapper.find(EntityDetailApp)).to.have.length(1)
      })
    })
  })
})
