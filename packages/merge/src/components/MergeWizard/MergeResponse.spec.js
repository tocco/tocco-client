import React from 'react'
import {shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {IntlStub, intlEnzyme, TestThemeProvider} from 'tocco-test-util'

import MergeResponse, {EntityResponseTable} from './MergeResponse'

const EMPTY_FUNC = () => {}

describe('merge', () => {
  describe('components', () => {
    describe('MergeResponse', () => {
      test('should render EntityResponseTable', () => {
        const mergeResponse = {
          notCopiedRelations: [
            {pk: 'pk', entity: 'entity', name: 'name'}
          ],
          notDeletedEntities: []
        }

        const wrapper = shallow(
          <MergeResponse
            fireExternalEvent={EMPTY_FUNC}
            mergeResponse={mergeResponse}
            intl={IntlStub}
          />
        )

        expect(wrapper.find(EntityResponseTable)).to.have.length(2)
        expect(wrapper.find(FormattedMessage)).to.have.length(2)
      })

      test('should render info-box', () => {
        const mergeResponse = {
          notCopiedRelations: [],
          notDeletedEntities: [],
          showPermissionMessage: true
        }

        const wrapper = shallow(
          <MergeResponse
            fireExternalEvent={EMPTY_FUNC}
            mergeResponse={mergeResponse}
            intl={IntlStub}
          />
        )

        expect(wrapper.find(FormattedMessage)).to.have.length(3)
      })

      test('should render a table', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <EntityResponseTable
              title=""
              responseEntities={[
                {pk: 'pk', entity: 'entity', name: 'name'}
              ]}
            />
          </TestThemeProvider>
        )

        expect(wrapper.find('table')).to.have.length(1)
      })

      test('should not render a table', () => {
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
