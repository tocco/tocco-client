import _get from 'lodash/get'
import {IntlStub} from 'tocco-test-util'

import {
  ACTION_GROUP_CREATECOPY_ID,
  ACTION_GROUP_ACTIONS_ID,
  addCreate,
  addReports,
  MAIN_ACTION_BAR_ID,
  removeBoxes,
  removeActions,
  adjustActions
} from './formModifier'

describe('app-extensions', () => {
  describe('form', () => {
    describe('formModifier', () => {
      const formDefinitionFull = {
        id: 'Test_list',
        children: [
          {
            id: MAIN_ACTION_BAR_ID,
            children: [
              {
                id: ACTION_GROUP_CREATECOPY_ID
              },
              {
                reportId: 'reportFormDefinition'
              }
            ]
          }
        ]
      }

      describe('addCreate', () => {
        test('in create scope do not add new action', () => {
          const emptyFormDefinition = {
            id: 'Test_create',
            children: []
          }
          expect(addCreate(emptyFormDefinition, IntlStub).children.size, 0)
        })

        test('do not add create action if createcopy actiongroup already exists', () => {
          expect(addCreate(formDefinitionFull, IntlStub).children[0].children.map(r => r.reportId || r.id)).to.be.eql([
            ACTION_GROUP_CREATECOPY_ID,
            'reportFormDefinition'
          ])
        })

        test('add create action if no main action bar exists', () => {
          const formDefinition = {
            id: 'Test_list',
            children: []
          }
          expect(addCreate(formDefinition, IntlStub).children[0].children.map(r => r.reportId || r.id)).to.be.eql([
            'new'
          ])
        })

        test('add create action if no createcopy action group exists', () => {
          const formDefinition = {
            id: 'Test_list',
            children: [
              {
                id: MAIN_ACTION_BAR_ID,
                children: [
                  {
                    reportId: 'reportFormDefinition'
                  }
                ]
              }
            ]
          }

          expect(addCreate(formDefinition, IntlStub).children[0].children.map(r => r.reportId || r.id)).to.be.eql([
            'new',
            'reportFormDefinition'
          ])
        })
      })

      describe('addReports', () => {
        const reports = [
          {
            reportId: 'reportDynamic1'
          },
          {
            reportId: 'reportDynamic2'
          }
        ]

        test('add reports', () => {
          expect(
            addReports(formDefinitionFull, reports, 'output').children[0].children.map(r => r.reportId || r.id)
          ).to.be.eql([ACTION_GROUP_CREATECOPY_ID, 'reportDynamic1', 'reportDynamic2', 'reportFormDefinition'])
        })

        test('add reports after createcopy and before action group', () => {
          const formDefinition = {
            children: [
              {
                id: MAIN_ACTION_BAR_ID,
                children: [
                  {
                    id: ACTION_GROUP_CREATECOPY_ID
                  },
                  {
                    id: ACTION_GROUP_ACTIONS_ID
                  }
                ]
              }
            ]
          }
          expect(
            addReports(formDefinition, reports, 'output').children[0].children.map(r => r.reportId || r.id)
          ).to.be.eql([ACTION_GROUP_CREATECOPY_ID, 'reportDynamic1', 'reportDynamic2', ACTION_GROUP_ACTIONS_ID])
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
