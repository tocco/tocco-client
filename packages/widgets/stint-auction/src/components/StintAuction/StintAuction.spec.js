import _get from 'lodash/get'

import {modifyFormDefinition} from './StintAuction'

describe('StintAuction', () => {
  describe('modifyFormDefinition', () => {
    const appContext = {widgetConfigKey: 'widget'}
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
    test('should adjust action when enabled', () => {
      const modifiedFormDefinition = modifyFormDefinition(formDefinition, appContext).next().value
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
  })
})
