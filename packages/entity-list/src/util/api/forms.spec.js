import {mockData} from 'tocco-util'
import _omit from 'lodash/omit'

import * as forms from './forms'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
        describe('getSorting', () => {
          test('should return sorting array of table', () => {
            const sorting = [{
              field: 'user_nr',
              order: 'asc'
            }]
            const formDefinition = {

              children: [{
                layoutType: 'table',
                componentType: 'table',
                sorting
              }]
            }
            const result = forms.getSorting(formDefinition)
            expect(result).to.eql(sorting)
          })

          test('should return empty array in case of no sorting', () => {
            const formDefinition = {
              children: [{
                layoutType: 'table',
                componentType: 'table'
              }]
            }
            const result = forms.getSorting(formDefinition)
            expect(result).to.eql([])
          })
        })

        describe('getColumnDefinition', () => {
          test('should return an array', () => {
            const field1 = {id: 'name1', componentType: 'field', dataType: 'string', label: 'label'}
            const field2 = {id: 'name2', componentType: 'field', dataType: 'decimal', label: 'label'}

            const formDefinition = {
              children: [
                {
                  id: 'lb1',
                  label: 'label1',
                  useLabel: 'YES',
                  children: [field1],
                  sortable: true,
                  widthFixed: false,
                  width: null
                }, {
                  id: 'lb2',
                  label: 'label2',
                  children: [field2],
                  sortable: false,
                  widthFixed: true,
                  width: 500
                }
              ]

            }

            const result = forms.getColumnDefinition(formDefinition)

            const expectedColumnDefinition = [
              {
                label: 'label1',
                id: 'lb1',
                children: [field1],
                sorting: {sortable: true},
                resizable: true,
                rightAligned: false
              },
              {
                label: 'label2',
                id: 'lb2',
                children: [field2],
                sorting: {sortable: false},
                resizable: false,
                rightAligned: true
              }
            ]

            expect(result[0]).to.have.property('CellRenderer')
            expect(result.map(r => _omit(r, ['CellRenderer']))).to.eql(expectedColumnDefinition)
          })

          test('should ignore HIDDEN columns and hidden fields', () => {
            const field1 = {id: 'name1', componentType: 'field', label: 'label'}
            const field2Hidden = {id: 'name2', componentType: 'field', hidden: true, label: 'label'}

            const formDefinition = {
              children: [
                {
                  hidden: false,
                  id: 'lb1',
                  label: 'label1',
                  children: [field1],
                  sortable: true,
                  widthFixed: false,
                  width: null
                }, {
                  hidden: false,
                  id: 'lb2',
                  label: 'label2',
                  children: [field2Hidden],
                  sortable: true,
                  widthFixed: false,
                  width: null
                },
                {
                  hidden: true,
                  id: 'lb3',
                  label: 'label3',
                  children: [field1],
                  sortable: true,
                  widthFixed: false,
                  width: null
                }
              ]
            }

            const result = forms.getColumnDefinition(formDefinition)

            expect(result).to.have.length(1)
            expect(result[0].id).to.eql('lb1')
          })

          test('should ignore columns hidden in preferences', () => {
            const displayableField = {id: 'name1', componentType: 'field', label: 'label'}
            const formDefinition = {
              children: [
                {
                  hidden: false,
                  id: 'lb1',
                  label: 'label1',
                  sortable: true,
                  widthFixed: false,
                  width: null,
                  children: [displayableField]
                }, {
                  hidden: false,
                  id: 'lb2',
                  label: 'label2',
                  sortable: true,
                  widthFixed: false,
                  width: null,
                  children: [displayableField]
                }
              ]
            }

            const columnPreferences = {
              lb2: false
            }

            const result = forms.getColumnDefinition(formDefinition, undefined, undefined, undefined, columnPreferences)

            expect(result).to.have.length(1)
            expect(result[0].id).to.eql('lb1')
          })
        })

        describe('getFields', () => {
          test('should return array of all fields but none more than once', () => {
            const formDefinition = {
              children: [{
                componentType: 'table',
                layoutType: 'table',
                children: [
                  {
                    hidden: false,
                    id: 'lb1',
                    label: 'Fullname',
                    useLabel: 'YES',
                    componentType: 'layout',
                    layoutType: 'vertical-box',
                    children: [
                      {path: 'firstname', dataType: 'text', componentType: 'field', hidden: false, label: 'Firstname'},
                      {path: 'lastname', dataType: 'text', componentType: 'field', hidden: false, label: 'Lastname'}],
                    sortable: true
                  },
                  {
                    hidden: false,
                    name: 'lb3',
                    label: null,
                    componentType: 'layout',
                    layoutType: 'vertical-box',
                    children: [
                      {path: 'firstname', dataType: 'text', componentType: 'field', hidden: false, label: 'Firstname'},
                      {path: 'email', dataType: 'text', componentType: 'field', hidden: false, label: 'Mail'}

                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefinition)

            const expectedPaths = ['firstname', 'lastname', 'email']
            expect(result.paths).to.eql(expectedPaths)
          })

          test('should ignore actions and other fields', () => {
            const formDefinition = {
              children: [{
                componentType: 'table',
                layoutType: 'table',
                children: [
                  {
                    hidden: false,
                    id: 'box2',
                    label: null,
                    componentType: 'layout',
                    layoutType: 'vertical-box',
                    children: [
                      {
                        id: 'description',
                        path: 'description',
                        componentType: 'field'
                      },
                      {
                        componentType: 'action',
                        id: 'exampleSimpelAction'
                      },
                      {
                        componentType: 'field',
                        id: 'firstname',
                        path: 'firstname'
                      },
                      {
                        id: 'displayExpression',
                        componentType: 'display'
                      }
                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefinition)
            const expectedResult = ['description', 'firstname']
            expect(result.paths).to.eql(expectedResult)
          })

          test('should return relationFields and displayExpressions', () => {
            const formDefinition = {
              children: [{
                componentType: 'table',
                layoutType: 'table',
                children: [
                  {
                    hidden: false,
                    id: 'box2',
                    label: null,
                    componentType: 'layout',
                    layoutType: 'vertical-box',
                    children: [
                      {
                        id: 'relUser',
                        path: 'relUser',
                        componentType: 'field',
                        dataType: 'single-select-box'
                      },
                      {
                        componentType: 'action',
                        id: 'exampleSimpelAction'
                      },
                      {
                        componentType: 'field',

                        id: 'firstname',
                        path: 'firstname'
                      },
                      {
                        id: 'display1',
                        componentType: 'display'
                      },
                      {
                        id: 'display2',
                        componentType: 'display'
                      },
                      {
                        id: 'relXy',
                        path: 'relXy',
                        componentType: 'field',
                        dataType: 'multi-remote-field'
                      }
                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefinition)
            expect(result.relationFields).to.eql(['relUser', 'relXy'])
            expect(result.displayExpressionFields).to.eql(['display1', 'display2'])
          })
        })

        describe('getSelectable', () => {
          const getFormDefinition = selectable => ({
            children: [{
              layoutType: 'table',
              componentType: 'table',
              ...(selectable !== null ? {selectable} : {})
            }]
          })

          test('should return selectable boolean of the form definition', () => {
            const result = forms.getSelectable(getFormDefinition(true))
            expect(result).to.be.true
          })

          test('should return selectable boolean false of the form definition', () => {
            const result = forms.getSelectable(getFormDefinition(false))
            expect(result).to.be.false
          })

          test('should return true if selectable not in definition', () => {
            const result = forms.getSelectable(getFormDefinition(null))
            expect(result).to.be.true
          })
        })

        describe('getClickable', () => {
          const getFormDefinition = clickable => ({
            children: [{
              layoutType: 'table',
              componentType: 'table',
              ...(clickable !== null ? {clickable} : {})
            }]
          })

          test('should return clickable boolean of the form definition', () => {
            const result = forms.getClickable(getFormDefinition(true))
            expect(result).to.be.true
          })

          test('should return clickable boolean false of the form definition', () => {
            const result = forms.getClickable(getFormDefinition(false))
            expect(result).to.be.false
          })

          test('should return true if clickable not in definition', () => {
            const result = forms.getClickable(getFormDefinition(null))
            expect(result).to.be.true
          })
        })

        describe('getEndpoint', () => {
          const getFormDefinition = endpoint => ({
            children: [{
              layoutType: 'table',
              componentType: 'table',
              ...(endpoint !== null ? {endpoint} : {})
            }]
          })

          test('should return endpoint', () => {
            const endpoint = 'nice2/rest/xc'
            const result = forms.getEndpoint(getFormDefinition(endpoint))
            expect(result).to.eql(endpoint)
          })

          test('should return null if endpoint is not defined', () => {
            const result = forms.getEndpoint(getFormDefinition(null))
            expect(result).to.be.null
          })

          test('should return null if endpoint is empty', () => {
            const result = forms.getEndpoint(getFormDefinition(''))
            expect(result).to.be.null
          })
        })

        describe('getConstriction', () => {
          const getFormDefinition = constriction => ({
            children: [{
              layoutType: 'table',
              componentType: 'table',
              ...(constriction !== null ? {constriction} : {})
            }]
          })

          test('should return constriction', () => {
            const constriction = 'sample'
            const result = forms.getConstriction(getFormDefinition(constriction))
            expect(result).to.eql(constriction)
          })

          test('should return null if constriction is not defined', () => {
            const result = forms.getConstriction(getFormDefinition(null))
            expect(result).to.be.null
          })

          test('should return null if constriction is empty', () => {
            const result = forms.getConstriction(getFormDefinition(''))
            expect(result).to.be.null
          })
        })

        describe('changeParentFieldType', () => {
          test('should change the type of a parent field to single-select-box', () => {
            const result = forms.changeParentFieldType(mockData.data.dummyEntitySearchForm.form, 'relUser')
            const flatten = forms.getFormFieldFlat(result)
            expect(flatten.relUser).to.eql('single-select-box')
          })

          test('should not change the type of any other field or the form structure', () => {
            const form = mockData.data.dummyEntitySearchForm.form
            const result = forms.changeParentFieldType(form, 'relUser')

            expect(result.children[0].children[0]).to.eql(form.children[0].children[0])

            const flatten = forms.getFormFieldFlat(result)
            expect(flatten.txtFulltext).to.eql('fulltext-search')
            expect(flatten.label).to.eql('string')
            expect(flatten.active).to.eql('boolean')
          })

          test('should not break if children property is not defined', () => {
            const form = {
              id: 'User_detail_relDummySubGrid_search',
              label: null,
              children: [
                {
                  id: 'box1',
                  componentType: 'layout',
                  layoutType: 'vertical-box',
                  hidden: false,
                  label: null,
                  useLabel: 'NO'
                }
              ],
              componentType: 'form',
              modelName: 'Dummy_entity'
            }

            const result = forms.changeParentFieldType(form, 'relUser')
            expect(result).to.deep.eql(form)
          })
        })
      })
    })
  })
})
