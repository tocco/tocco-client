import fetchMock from 'fetch-mock'
import _get from 'lodash/get'
import {rest} from 'tocco-app-extensions'

import {modifyFormDefinition} from './MailingList'

describe('MailingList', () => {
  describe('modifyFormDefinition', () => {
    const reports = [{id: 'example-report'}]
    const intl = {
      formatMessage: () => 'formatted message'
    }
    const appContext = {widgetConfigKey: 'widget'}
    const parent = {key: 'parent'}
    describe('user list', () => {
      const formDefinition = {
        id: 'Mailing_list_detail_relUser_list',
        label: 'Person',
        componentType: 'form',
        children: [
          {
            id: 'main-action-bar',
            componentType: 'action-bar',
            children: [
              {
                id: 'actions',
                componentType: 'action-group',
                children: [
                  {
                    id: 'mailing-list-mail-action',
                    componentType: 'action'
                  }
                ]
              }
            ]
          }
        ]
      }
      test('should add reports', () => {
        const modifiedFormDefinition = modifyFormDefinition(formDefinition, {}, {reports, intl}).next().value
        expect(_get(modifiedFormDefinition, ['children', '0', 'children', '0', 'children', '0', 'id'])).to.eq(
          'example-report'
        )
      })
      test('should remove action when disabled', () => {
        const modifiedFormDefinition = modifyFormDefinition(formDefinition, {}, {showEmailAction: false}).next().value
        expect(_get(modifiedFormDefinition, ['children', '0', 'children'])).to.be.empty
      })
      test('should adjust action when enabled', () => {
        const modifiedFormDefinition = modifyFormDefinition(
          formDefinition,
          {parent},
          {showEmailAction: true, appContext}
        ).next().value
        const actionProperties = _get(modifiedFormDefinition, [
          'children',
          '0',
          'children',
          '0',
          'children',
          '0',
          'properties'
        ])
        expect(actionProperties.eventKey).to.eq('parent')
        expect(actionProperties.widgetKey).to.eq('widget')
      })
    })

    describe('user detail', () => {
      const formDefinition = {
        id: 'Mailing_list_User_detail',
        label: 'Person',
        componentType: 'form',
        children: [
          {
            id: 'box1',
            componentType: 'layout',
            children: [
              {
                id: 'user_information',
                componentType: 'layout',
                children: []
              }
            ]
          },
          {
            id: 'box2',
            componentType: 'layout',
            children: [
              {
                id: 'address_information',
                componentType: 'layout',
                children: []
              }
            ]
          },
          {
            id: 'box3',
            componentType: 'layout',
            children: [
              {
                id: 'communication_information',
                componentType: 'layout',
                children: []
              }
            ]
          }
        ]
      }
      test('should remove boxes when details not published', () => {
        fetchMock.restore()
        fetchMock.get('*', {
          body: {
            paths: {
              publish_detail: {
                value: false
              }
            }
          }
        })

        const generator = modifyFormDefinition(formDefinition, {entityName: 'User', entityId: 'userId'}, {})
        let current = generator.next()
        while (!current.done) {
          current = generator.next()
        }
        const modifiedFormDefinition = current.value
        expect(_get(modifiedFormDefinition, ['children', '0', 'children'])).to.not.be.empty
        expect(_get(modifiedFormDefinition, ['children', '1', 'children'])).to.be.empty
        expect(_get(modifiedFormDefinition, ['children', '2', 'children'])).to.be.empty

        fetchMock.reset()
      })
      test('should keep boxes when details are published', function* () {
        jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => ({
          paths: {
            publish_detail: {
              value: true
            }
          }
        }))

        const modifiedFormDefinition = yield modifyFormDefinition(
          formDefinition,
          {entityName: 'User', entityId: 'userId'},
          {}
        )
        expect(_get(modifiedFormDefinition, ['children', '0', 'children'])).to.not.be.empty
        expect(_get(modifiedFormDefinition, ['children', '1', 'children'])).to.not.be.empty
        expect(_get(modifiedFormDefinition, ['children', '2', 'children'])).to.not.be.empty
      })
    })
  })
})
