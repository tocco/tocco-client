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
                type: 'ch.tocco.nice2.model.form.components.table.Table',
                sorting
              }]
            }
            const result = forms.getSorting(formDefinition)
            expect(result).to.eql(sorting)
          })

          it('should return empty array in case of no sorting', () => {
            const formDefinition = {
              children: [{
                type: 'ch.tocco.nice2.model.form.components.table.Table'
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
            const field1 = {name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}
            const field2 = {name: 'name2', type: 'type', displayType: 'EDITABLE', label: 'label'}

            const formDefinition = {
              children: [
                {
                  displayType: 'EDITABLE',
                  type: 'ch.tocco.nice2.model.form.components.table.Column',
                  name: 'lb1',
                  label: 'label1',
                  useLabel: 'YES',
                  children: [field1],
                  sortable: true
                }, {
                  displayType: 'EDITABLE',
                  type: 'ch.tocco.nice2.model.form.components.table.Column',
                  name: 'lb2',
                  label: 'label2',
                  useLabel: 'YES',
                  children: [field2],
                  sortable: false
                }
              ]

            }

            const result = forms.getColumnDefinition(formDefinition)

            const expectedColumnDefinition = [
              {label: 'label1', name: 'lb1', children: [field1], sortable: true},
              {label: 'label2', name: 'lb2', children: [field2], sortable: false}
            ]

            expect(result).to.eql(expectedColumnDefinition)
          })

          it('should ignore HIDDEN columns and hidden fields', () => {
            const field1 = {name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}
            const field2Hidden = {name: 'name2', type: 'type', displayType: 'HIDDEN', label: 'label'}

            const formDefinition = {
              children: [
                {
                  displayType: 'EDITABLE',
                  type: 'ch.tocco.nice2.model.form.components.table.Column',
                  name: 'lb1',
                  label: 'label1',
                  useLabel: 'YES',
                  children: [field1],
                  sortable: true
                }, {
                  displayType: 'EDITABLE',
                  type: 'ch.tocco.nice2.model.form.components.table.Column',
                  name: 'lb2',
                  label: 'label2',
                  useLabel: 'NO',
                  children: [field2Hidden],
                  sortable: true
                },
                {
                  displayType: 'HIDDEN',
                  type: 'ch.tocco.nice2.model.form.components.table.Column',
                  name: 'lb3',
                  label: 'label3',
                  useLabel: 'YES',
                  children: [field1],
                  sortable: true
                }
              ]
            }

            const result = forms.getColumnDefinition(formDefinition)

            const expectedcolumnDefinition = [
              {label: 'label1', name: 'lb1', children: [field1], sortable: true}
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
                name: 'table',
                type: 'ch.tocco.nice2.model.form.components.table.Table',
                children: [
                  {
                    displayType: 'EDITABLE',
                    name: 'lb1',
                    label: 'Fullname',
                    useLabel: 'YES',
                    children: [
                      {name: 'firstname', type: 'text', displayType: 'EDITABLE', label: 'Firstname'},
                      {name: 'lastname', type: 'text', displayType: 'EDITABLE', label: 'Lastname'}],
                    sortable: true
                  },
                  {
                    displayType: 'EDITABLE',
                    name: 'lb3',
                    label: 'Test',
                    useLabel: 'NO',
                    children: [
                      {name: 'firstname', type: 'text', displayType: 'EDITABLE', label: 'Firstname'},
                      {name: 'email', type: 'text', displayType: 'EDITABLE', label: 'Mail'}

                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefintion)

            expect(result).to.eql(['firstname', 'lastname', 'email'])
          })

          it('should ignore actions and other ignored fields', () => {
            const formDefinition = {
              children: [{
                name: 'table',
                type: 'ch.tocco.nice2.model.form.components.table.Table',
                children: [
                  {
                    displayType: 'EDITABLE',
                    name: 'lb1',
                    label: 'Fullname',
                    useLabel: true,
                    children: [
                      {
                        name: 'description',
                        type: 'ch.tocco.nice2.model.form.components.simple.DescriptionField'
                      },
                      {
                        'type': 'ch.tocco.nice2.model.form.components.action.SimpleAction',
                        'name': 'exampleSimpelAction'
                      },
                      {
                        'type': 'ch.tocco.nice2.model.form.components.X',
                        'name': 'firstname'
                      }
                    ],
                    sortable: true
                  }
                ]
              }]
            }

            const result = forms.getFields(formDefinition)

            expect(result).to.eql(['firstname'])
          })
        })
      })
    })
  })
})
