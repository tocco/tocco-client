import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import * as forms from './forms'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
        describe('getSorting', () => {
          it('should return sorting array of table', () => {
            const sorting = [ {
              'field': 'user_nr',
              'order': 'asc'
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

          it('should return empty array in case of no sorting', () => {
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

        describe('searchFormTransformer', () => {
          it('should return the form property', () => {
            const fetchResult = require('../../dev/test-data/user_search.json')
            const result = forms.searchFormTransformer(fetchResult)
            expect(result).to.eql(fetchResult.form)
          })

          it('should return undefined if form is missing', () => {
            const result = forms.searchFormTransformer({})
            expect(result).to.eql(undefined)
          })
        })

        describe('getColumnDefinition', () => {
          it('should return an array', () => {
            const field1 = {id: 'name1', componentType: 'field', dataType: 'string', label: 'label'}
            const field2 = {id: 'name2', componentType: 'field', dataType: 'string', label: 'label'}

            const formDefinition = {
              children: [
                {
                  id: 'lb1',
                  label: 'label1',
                  useLabel: 'YES',
                  children: [field1],
                  sortable: true
                }, {
                  id: 'lb2',
                  label: 'label2',
                  children: [field2],
                  sortable: false
                }
              ]

            }

            const result = forms.getColumnDefinition(formDefinition)

            const expectedColumnDefinition = [
              {label: 'label1', id: 'lb1', children: [field1], sortable: true},
              {label: 'label2', id: 'lb2', children: [field2], sortable: false}
            ]

            expect(result).to.eql(expectedColumnDefinition)
          })

          it('should ignore HIDDEN columns and hidden fields', () => {
            const field1 = {id: 'name1', componentType: 'field', label: 'label'}
            const field2Hidden = {id: 'name2', componentType: 'field', hidden: true, label: 'label'}

            const formDefinition = {
              children: [
                {
                  hidden: false,
                  id: 'lb1',
                  label: 'label1',
                  children: [field1],
                  sortable: true
                }, {
                  hidden: false,
                  id: 'lb2',
                  label: 'label2',
                  children: [field2Hidden],
                  sortable: true
                },
                {
                  hidden: true,
                  id: 'lb3',
                  label: 'label3',
                  children: [field1],
                  sortable: true
                }
              ]
            }

            const result = forms.getColumnDefinition(formDefinition)

            const expectedcolumnDefinition = [
              {label: 'label1', id: 'lb1', children: [field1], sortable: true}
            ]
            expect(result).to.eql(expectedcolumnDefinition)
          })
        })

        describe('fetchForm', () => {
          it('should fetch the form', () => {
            const gen = forms.fetchForm('User_search')

            expect(gen.next().value).to.eql(call(requestSaga, 'forms/User_search', {
              acceptedStatusCodes: [404]
            }))

            const resp = {
              body: {
                form: {
                  name: 'User_search'
                }
              }
            }

            expect(gen.next(resp).value).to.eql(call(forms.defaultFormTransformer, resp.body))

            const next = gen.next(resp.body.form)

            expect(next.value).to.eql(resp.body.form)
            expect(next.done).to.be.true
          })

          it('should ignore 404 errors', () => {
            const gen = forms.fetchForm('User_search')

            expect(gen.next().value).to.eql(call(requestSaga, 'forms/User_search', {
              acceptedStatusCodes: [404]
            }))

            const resp = {status: 404}

            const next = gen.next(resp)

            expect(next.value).to.eql(null)
            expect(next.done).to.be.true
          })
        })

        describe('getFields', () => {
          it('should return array of all fields but none more than once', () => {
            const formDefintion = {
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
                      {id: 'firstname', dataType: 'text', componentType: 'field', hidden: false, label: 'Firstname'},
                      {id: 'lastname', dataType: 'text', componentType: 'field', hidden: false, label: 'Lastname'}],
                    sortable: true
                  },
                  {
                    hidden: false,
                    name: 'lb3',
                    label: null,
                    componentType: 'layout',
                    layoutType: 'vertical-box',
                    children: [
                      {id: 'firstname', dataType: 'text', componentType: 'field', hidden: false, label: 'Firstname'},
                      {id: 'email', dataType: 'text', componentType: 'field', hidden: false, label: 'Mail'}

                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefintion)

            expect(result).to.eql(['firstname', 'lastname', 'email'])
          })

          it('should ignore actions and other fields', () => {
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
                        componentType: 'field'
                      },
                      {
                        componentType: 'action',
                        id: 'exampleSimpelAction'
                      },
                      {
                        componentType: 'display',
                        id: 'firstname'
                      },
                      {
                        id: 'description2',
                        componentType: 'field'
                      }
                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefinition)

            expect(result).to.eql(['description', 'firstname', 'description2'])
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

          it('should return seletable boolean of the form definition', () => {
            const result = forms.getSelectable(getFormDefinition(true))
            expect(result).to.be.true
          })

          it('should return seletable boolean false of the form definition', () => {
            const result = forms.getSelectable(getFormDefinition(false))
            expect(result).to.be.false
          })

          it('should return true if selectable not in defintion', () => {
            const result = forms.getSelectable(getFormDefinition(null))
            expect(result).to.be.true
          })
        })
      })
    })
  })
})
