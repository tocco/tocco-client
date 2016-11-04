import React from 'react'
import MergeResponse, {EntityResponseTable} from './MergeResponse'
import {shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {IntlStub} from 'tocco-test-util'

describe('merge', () => {
  describe('components', () => {
    describe('MergeResponse', () => {
      it('should render EntityResponseTable', () => {
        const mergeResponse = {
          notCopiedRelations: [
            {pk: 'pk', entity: 'entity', name: 'name'}
          ],
          notDeletedEntities: []
        }

        const wrapper = shallow(
          <MergeResponse
            mergeResponse={mergeResponse}
            intl={IntlStub}
          />
        )

        expect(wrapper.find(EntityResponseTable)).to.have.length(2)
        expect(wrapper.find(FormattedMessage)).to.have.length(3)
      })

      it('should render info-box', () => {
        const mergeResponse = {
          notCopiedRelations: [],
          notDeletedEntities: [],
          showPermissionMessage: true
        }

        const wrapper = shallow(
          <MergeResponse
            mergeResponse={mergeResponse}
            intl={IntlStub}
          />
        )

        expect(wrapper.find(FormattedMessage)).to.have.length(4)
      })

      it('should render a table', () => {
        const wrapper = shallow(
          <EntityResponseTable
            title=""
            responseEntities={[
              {pk: 'pk', entity: 'entity', name: 'name'}
            ]}
          />
        )

        expect(wrapper.find('table')).to.have.length(1)
      })

      it('should not render a table', () => {
        const wrapper = shallow(
          <EntityResponseTable
            title=""
            responseEntities={[]}
          />
        )

        expect(wrapper.find('table')).to.have.length(0)
      })
    })
  })
})
