import {IntlStub} from 'tocco-test-util'

import {
  ACTION_GROUP_ACTIONS_ID,
  ACTION_GROUP_CREATECOPY_ID,
  ACTION_GROUP_OUTPUT_ID,
  ACTION_SAVE_ID,
  addOutputGroup,
  addReports,
  MAIN_ACTION_BAR_ID,
  removeCreate
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
    })
  })
})
