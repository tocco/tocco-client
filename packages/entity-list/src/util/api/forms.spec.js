import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import * as forms from './forms'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
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

        describe('tableDefinitionTransformer', () => {
          it('should return an object with the column definition and the default sorting and check permissions', () => {
            const field1 = {name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}
            const field2 = {name: 'name2', type: 'type', displayType: 'EDITABLE', label: 'label'}

            const fetchResult = {
              form: {
                permissions: {
                  create: true
                },
                children: [{
                  name: 'table',
                  type: 'ch.tocco.nice2.model.form.components.table.Table',
                  sorting: [
                    {orderItem: 'lb1', ascending: false},
                    {orderItem: 'lb2', ascending: true}
                  ],
                  children: [
                    {
                      displayType: 'EDITABLE',
                      name: 'lb1',
                      label: 'label1',
                      useLabel: true,
                      children: [field1],
                      sortable: true
                    }, {
                      displayType: 'EDITABLE',
                      name: 'lb2',
                      label: 'label2',
                      useLabel: false,
                      children: [field2],
                      sortable: false
                    }
                  ]
                }]
              }
            }
            const result = forms.tableDefinitionTransformer(fetchResult)

            const expectedColumnDefinition = [
              {label: 'label1', useLabel: true, name: 'lb1', child: field1, sortable: true},
              {label: 'label2', useLabel: false, name: 'lb2', child: field2, sortable: false}
            ]

            const expectedSorting = 'lb1 desc,lb2 asc'

            const expectedResult = {
              columnDefinition: expectedColumnDefinition,
              sorting: expectedSorting,
              permissions: {create: true, delete: false, read: true, update: false}
            }

            expect(result).to.eql(expectedResult)
          })

          it('should ignore HIDDEN columns and hidden fields', () => {
            const field1 = {name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}
            const field2Hidden = {name: 'name2', type: 'type', displayType: 'HIDDEN', label: 'label'}

            const fetchResult = {
              form: {
                children: [{
                  name: 'table',
                  type: 'ch.tocco.nice2.model.form.components.table.Table',
                  children: [
                    {
                      displayType: 'EDITABLE',
                      name: 'lb1',
                      label: 'label1',
                      useLabel: true,
                      children: [field1],
                      sortable: true
                    }, {
                      displayType: 'EDITABLE',
                      name: 'lb2',
                      label: 'label2',
                      useLabel: false,
                      children: [field2Hidden],
                      sortable: true
                    },
                    {
                      displayType: 'HIDDEN',
                      name: 'lb3',
                      label: 'label3',
                      useLabel: false,
                      children: [field1],
                      sortable: true
                    }
                  ]
                }]
              }
            }
            const result = forms.tableDefinitionTransformer(fetchResult)

            const expectedTableDefinition = {
              columnDefinition: [
                {label: 'label1', useLabel: true, name: 'lb1', child: field1, sortable: true}
              ],
              sorting: null,
              permissions: {create: false, delete: false, read: true, update: false}
            }

            expect(result).to.eql(expectedTableDefinition)
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
      })
    })
  })
})
