import React from 'react'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import {MemoryRouter} from 'react-router-dom'
import fetchMock from 'fetch-mock'

import EntityDetail from './'
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

        const routerMock = {
          match: {url: '/detail', history: {}}
        }
      
        setupFetchMock(fetchMock)

        const wrapper = mount(
          <MemoryRouter>
            <EntityDetail
              router={routerMock}
              loadDetailParams={EMPTY_FUNC}
              dispatchEmittedAction={EMPTY_FUNC}
              clearDetailParams={EMPTY_FUNC}
              setFormTouched={EMPTY_FUNC}
              intl={IntlStub}
              detailParams={detailParams}/>
          </MemoryRouter>
        )

        expect(wrapper.find(EntityDetailApp)).to.have.length(1)
      })
    })
  })
})
