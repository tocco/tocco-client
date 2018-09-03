import React from 'react'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import {MemoryRouter} from 'react-router-dom'

import EntityDetail from './'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityDetail', () => {
      it('should render App ', () => {
        const detailParams = {
          entityName: 'User',
          formName: 'UserSearch'
        }

        const routerMock = {
          match: {url: '/detail', history: {}}
        }

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
