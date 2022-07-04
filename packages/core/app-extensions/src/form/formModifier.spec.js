import _get from 'lodash/get'

import {
  ACTION_GROUP_CREATECOPY_ID,
  addReports,
  MAIN_ACTION_BAR_ID,
  removeCreate,
  removeBoxes,
  removeActions,
  adjustActions
} from './formModifier'

describe('app-extensions', () => {
  describe('form', () => {
    describe('formModifier', () => {
      const formDefinitionOutput = {
        children: [
          {
            id: MAIN_ACTION_BAR_ID,
            children: []
          }
        ]
      }

      const formDefinitionFull = {
        children: [
          {
            id: MAIN_ACTION_BAR_ID,
            children: [
              {
                id: ACTION_GROUP_CREATECOPY_ID
              },
              {
                reportId: 'report1'
              }
            ]
          }
        ]
      }

      const reports = [
        {
          reportId: 'report2'
        },
        {
          reportId: 'report3'
        }
      ]

      const getActionGroupIds = formDefinition => formDefinition.children[0].children.map(r => r.id)

      describe('removeCreate', () => {
        test('remove create action group', () => {
          expect(getActionGroupIds(removeCreate(formDefinitionFull)).length).to.be.eql(1)
        })

        test('create action group does not exist', () => {
          expect(getActionGroupIds(removeCreate(formDefinitionOutput)).length).to.be.eql(0)
        })
      })

      describe('addReports', () => {
        test('add reports', () => {
          expect(
            addReports(formDefinitionFull, reports, 'output').children[0].children.map(r => r.reportId || r.id)
          ).to.be.eql([ACTION_GROUP_CREATECOPY_ID, 'report1', 'report2', 'report3'])
        })
      })

      describe('removeBoxes', () => {
        const formDefinitionBoxes = {
          children: [
            {
              id: 'top-box',
              componentType: 'layout',
              children: [
                {
                  id: 'first-box',
                  componentType: 'layout',
                  children: []
                },
                {
                  id: 'second-box',
                  componentType: 'layout',
                  children: [
                    {
                      id: 'low-box',
                      componentType: 'layout',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }

        test('should remove boxes', () => {
          const modifiedFormDefinition = removeBoxes(formDefinitionBoxes, ['top-box'])
          expect(modifiedFormDefinition.children).to.be.empty
        })
        test('should remove boxes at any depth', () => {
          const modifiedFormDefinition = removeBoxes(formDefinitionBoxes, ['low-box'])
          expect(_get(modifiedFormDefinition, ['children', '0', 'children', '1', 'children'])).to.be.empty
        })
        test('should leave definition unchanged when boxes do not exist', () => {
          const modifiedFormDefinition = removeBoxes(formDefinitionBoxes, ['third-box'])
          expect(modifiedFormDefinition).to.deep.eq(formDefinitionBoxes)
        })
      })

      describe('removeActions', () => {
        const formDefinitionActions = {
          children: [
            {
              id: MAIN_ACTION_BAR_ID,
              componentType: 'action-bar',
              children: [
                {
                  componentType: 'action-group',
                  children: [
                    {
                      id: 'action1',
                      componentType: 'action'
                    },
                    {
                      id: 'action2',
                      componentType: 'action'
                    }
                  ]
                }
              ]
            }
          ]
        }
        test('should remove actions', () => {
          const modifiedFormDefinition = removeActions(formDefinitionActions, ['action1'])
          expect(_get(modifiedFormDefinition, ['children', '0', 'children', '0', 'children'])).to.have.length(1)
        })
        test('should remove empty groups', () => {
          const modifiedFormDefinition = removeActions(formDefinitionActions, ['action1', 'action2'])
          expect(_get(modifiedFormDefinition, ['children'])).to.be.empty
        })
        test('should leave definition unchanged when actions do not exist', () => {
          const modifiedFormDefinition = removeActions(formDefinitionActions, ['action3'])
          expect(modifiedFormDefinition).to.deep.eq(formDefinitionActions)
        })
      })

      describe('adjustActions', () => {
        const formDefinitionActions = {
          children: [
            {
              id: MAIN_ACTION_BAR_ID,
              componentType: 'action-bar',
              children: [
                {
                  componentType: 'action-group',
                  children: [
                    {
                      id: 'action1',
                      componentType: 'action'
                    }
                  ]
                }
              ]
            }
          ]
        }
        test('should change action', () => {
          const modifiedFormDefinition = adjustActions(formDefinitionActions, ['action1'], action => ({
            ...action,
            id: 'new-id'
          }))
          expect(_get(modifiedFormDefinition, ['children', '0', 'children', '0', 'children', '0', 'id'])).to.eq(
            'new-id'
          )
        })
        test('should leave definition unchanged when action does not exist', () => {
          const modifiedFormDefinition = adjustActions(formDefinitionActions, ['action2'], action => ({
            ...action,
            id: 'new-id'
          }))
          expect(modifiedFormDefinition).to.deep.eq(formDefinitionActions)
        })
      })
    })
  })
})
