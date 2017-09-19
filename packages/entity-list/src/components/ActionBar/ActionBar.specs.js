import React from 'react'
import ActionBar from './ActionBar'
import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('ActionBar', () => {
      it('should render', () => {
        const wrapper = shallow(
          <ActionBar showCreateButton={false} intl={IntlStub} navigateToCreate={EMPTY_FUNC} createPermission={true}/>
        )
        expect(wrapper.find('.action-bar')).to.have.length(1)
      })

      it('should render a create button if set and allowed', () => {
        const wrapper = shallow(
          <ActionBar
            showCreateButton={true}
            createPermission={true}
            intl={IntlStub}
            navigateToCreate={EMPTY_FUNC}
          />
        )
        expect(wrapper.find('.create-btn')).to.have.length(1)
      })

      it('should NOT render a create button if set and NOT allowed', () => {
        const wrapper = shallow(
          <ActionBar
            showCreateButton={true}
            createPermission={false}
            intl={IntlStub}
            navigateToCreate={EMPTY_FUNC}
          />
        )
        expect(wrapper.find('.create-btn')).to.have.length(0)
      })

      it('should NOT render a create button if NOT set and allowed', () => {
        const wrapper = shallow(
          <ActionBar
            showCreateButton={false}
            createPermission={true}
            intl={IntlStub}
            navigateToCreate={EMPTY_FUNC}
          />
        )
        expect(wrapper.find('.create-btn')).to.have.length(0)
      })
    })
  })
})
