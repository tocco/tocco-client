import _get from 'lodash/get'
import {IntlStub} from 'tocco-test-util'

import {
  ACTION_GROUP_ACTIONS_ID,
  ACTION_GROUP_CREATECOPY_ID,
  ACTION_GROUP_OUTPUT_ID,
  ACTION_SAVE_ID,
  addOutputGroup,
  addReports,
  MAIN_ACTION_BAR_ID,
  removeCreate,
  removeBoxes,
  removeActions,
  adjustAction
} from './formModifier'

describe('app-extensions', () => {
  describe('form', () => {
    describe('formModifier', () => {
      const formDefinitionCreate = {
        children: [
          {
            id: MAIN_ACTION_BAR_ID,
            children: [
              {
                id: ACTION_GROUP_CREATECOPY_ID
              }
            ]
          }
        ]
      }

      const formDefinitionOutput = {
        children: [
          {
            id: MAIN_ACTION_BAR_ID,
            children: [
              {
                id: ACTION_GROUP_OUTPUT_ID,
                children: []
              }
            ]
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
                id: ACTION_GROUP_OUTPUT_ID,
                children: [
                  {
                    reportId: 'report1'
                  }
                ]
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
          expect(getActionGroupIds(removeCreate(formDefinitionOutput)).length).to.be.eql(1)
        })
      })

      describe('addReports', () => {
        test('add reports', () => {
          expect(
            addReports(formDefinitionFull, reports, IntlStub).children[0].children[1].children.map(r => r.reportId)
          ).to.be.eql(['report1', 'report2', 'report3'])
        })

        test('create output group and add reports', () => {
          expect(
            addReports(formDefinitionCreate, reports, IntlStub).children[0].children[1].children.map(r => r.reportId)
          ).to.be.eql(['report2', 'report3'])
        })
      })

      describe('addOutputGroup', () => {
        test('main action bar is empty, so output is created', () => {
          const formDefinitionEmpty = {
            children: [
              {
                id: MAIN_ACTION_BAR_ID,
                children: []
              }
            ]
          }

          expect(getActionGroupIds(addOutputGroup(formDefinitionEmpty, IntlStub))).to.be.eql([ACTION_GROUP_OUTPUT_ID])
        })

        test('output action group already exists', () => {
          expect(getActionGroupIds(addOutputGroup(formDefinitionOutput, IntlStub))).to.be.eql([ACTION_GROUP_OUTPUT_ID])
        })

        test('add output action group after create', () => {
          expect(getActionGroupIds(addOutputGroup(formDefinitionCreate, IntlStub))).to.be.eql([
            ACTION_GROUP_CREATECOPY_ID,
            ACTION_GROUP_OUTPUT_ID
          ])
        })

        test('add output action group after save', () => {
          const formDefinitionSave = {
            children: [
              {
                id: MAIN_ACTION_BAR_ID,
                children: [
                  {
                    id: ACTION_GROUP_CREATECOPY_ID
                  },
                  {
                    id: ACTION_SAVE_ID
                  }
                ]
              }
            ]
          }

          expect(getActionGroupIds(addOutputGroup(formDefinitionSave, IntlStub))).to.be.eql([
            ACTION_GROUP_CREATECOPY_ID,
            ACTION_SAVE_ID,
            ACTION_GROUP_OUTPUT_ID
          ])
        })

        test('add output action group as first item', () => {
          const formDefinitionSave = {
            children: [
              {
                id: MAIN_ACTION_BAR_ID,
                children: [
                  {
                    id: ACTION_GROUP_ACTIONS_ID
                  }
                ]
              }
            ]
          }

          expect(getActionGroupIds(addOutputGroup(formDefinitionSave, IntlStub))).to.be.eql([
            ACTION_GROUP_OUTPUT_ID,
            ACTION_GROUP_ACTIONS_ID
          ])
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
              children: [
                {
                  componentType: 'action-group',
                  children: [
                    {
                      id: 'action1'
                    },
                    {
                      id: 'action2'
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
          expect(_get(modifiedFormDefinition, ['children', '0', 'children'])).to.be.empty
        })
        test('should leave definition unchanged when actions do not exist', () => {
          const modifiedFormDefinition = removeActions(formDefinitionActions, ['action3'])
          expect(modifiedFormDefinition).to.deep.eq(formDefinitionActions)
        })
      })

      describe('adjustAction', () => {
        const formDefinitionActions = {
          children: [
            {
              id: MAIN_ACTION_BAR_ID,
              children: [
                {
                  componentType: 'action-group',
                  children: [
                    {
                      id: 'action1'
                    }
                  ]
                }
              ]
            }
          ]
        }
        test('should change action', () => {
          const modifiedFormDefinition = adjustAction(formDefinitionActions, 'action1', action => ({
            ...action,
            id: 'new-id'
          }))
          expect(_get(modifiedFormDefinition, ['children', '0', 'children', '0', 'children', '0', 'id'])).to.eq(
            'new-id'
          )
        })
        test('should leave definition unchanged when action does not exist', () => {
          const modifiedFormDefinition = adjustAction(formDefinitionActions, 'action2', action => ({
            ...action,
            id: 'new-id'
          }))
          expect(modifiedFormDefinition).to.deep.eq(formDefinitionActions)
        })
      })
    })
  })
})
