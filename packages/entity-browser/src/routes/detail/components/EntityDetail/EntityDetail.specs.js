import React from 'react'
import EntityDetail from './'
import EntityDetailApp from 'entity-detail/src/main'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityDetail', () => {
      it('should render App ', () => {
        const detailParams = {
          entityName: 'User',
          formName: 'UserSearch'
        }

        const routerMock = {
          match: {url: '/detail'}
        }

        const wrapper = mount(
          <EntityDetail
            router={routerMock}
            loadDetailParams={EMPTY_FUNC}
            clearDetailParams={EMPTY_FUNC}
            intl={IntlStub}
            detailParams={detailParams}/>
        )

        expect(wrapper.find(EntityDetailApp)).to.have.length(1)
      })
    })
  })
})
