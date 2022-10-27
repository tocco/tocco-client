import _get from 'lodash/get'

import {modifyFormDefinition} from './formModifier'

describe('StintAuction', () => {
  describe('formModifier', () => {
    describe('modifyFormDefinition', () => {
      const appContext = {widgetConfigKey: 'widget'}

      test('should adjust action when enabled', () => {
        const formDefinition = {
          id: 'Stint_auction_detail',
          label: 'Veranstaltung',
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
                      id: 'stintAuctionRegisterLecturer',
                      componentType: 'action'
                    }
                  ]
                }
              ]
            }
          ]
        }

        const modifiedFormDefinition = modifyFormDefinition(formDefinition, appContext)
        const actionProperties = _get(modifiedFormDefinition, [
          'children',
          '0',
          'children',
          '0',
          'children',
          '0',
          'properties'
        ])
        expect(actionProperties.widgetKey).to.eq('widget')
      })

      test('should ignore actions when disabled', () => {
        const formDefinition = {
          id: 'Stint_auction_detail',
          label: 'Veranstaltung',
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
                      id: 'someOtherActions',
                      componentType: 'action'
                    }
                  ]
                }
              ]
            }
          ]
        }

        const modifiedFormDefinition = modifyFormDefinition(formDefinition, appContext)
        expect(modifiedFormDefinition).to.eql(formDefinition)
      })
    })
  })
})
