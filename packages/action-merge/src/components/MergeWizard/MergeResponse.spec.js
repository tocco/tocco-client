import React from 'react'
import MergeResponse from './MergeResponse'
import {EntityResponseTable, PermissionMessageBox} from './MergeResponse'
import {mount, render, shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'

const intl = {
  formatMessage: (obj) => obj.id
}

describe('action-merge', () => {
  describe('components', () => {
    describe('MergeResponse', () => {

      it('should render `notCopiedRelations` EntityResponseTable', () => {
        const mergeResponse = {
          notCopiedRelations: [
            { pk: "pk", entity: "entity", name: "name" }
          ],
          notDeletedEntities: [],
          showPermissionMessage: false
        }

        const wrapper = shallow(
          <MergeResponse
            mergeResponse={{
              notCopiedRelations: [
                { pk: "pk", entity: "entity", name: "name" }
              ],
              notDeletedEntities: [],
              showPermissionMessage: false
            }}
            intl={intl}
          />
        )

        expect(wrapper.find(EntityResponseTable)).to.have.length(2)
        expect(wrapper.find(PermissionMessageBox)).to.have.length(1)
      })

      it('should render a table', () => {
        const wrapper = shallow(
          <EntityResponseTable
            title=''
            responseEntities={[
              { pk: "pk", entity: "entity", name: "name" }
            ]}
          />
        )

        expect(wrapper.find('table')).to.have.length(1)
      })

      it('should not render a table', () => {
        const wrapper = shallow(
          <EntityResponseTable
            title=''
            responseEntities={[]}
          />
        )

        expect(wrapper.find('table')).to.have.length(0)
      })

      it('should not render info-box', () => {
        const wrapper = shallow(
          <PermissionMessageBox
            showPermissionMessage={false}
          />
        )

        expect(wrapper.find(FormattedMessage)).to.have.length(0)
      })

      it('should render info-box', () => {
        const wrapper = shallow(
          <PermissionMessageBox
            showPermissionMessage={true}
          />
        )

        expect(wrapper.find(FormattedMessage)).to.have.length(1)
      })
    })
  })
})
