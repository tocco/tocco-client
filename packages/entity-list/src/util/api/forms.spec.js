import * as forms from './forms'
import fetchMock from 'fetch-mock'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('searchFormTransformer', () => {
          it('should return an array of fields', () => {
            const fetchResult = require('../../dev/test-data/user_search.json')

            const result = forms.searchFormTransformer(fetchResult)
            const expectedResult = [
              {
                name: 'txtFulltext',
                type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                displayType: 'EDITABLE',
                label: 'Person',
                useLabel: 'YES'
              }
            ]
            expect(result).to.eql(expectedResult)
          })

          it('should return an empty array if form is missing', () => {
            const result = forms.searchFormTransformer({})
            expect(result).to.eql([])
          })
        })

        describe('columnDefinitionTransformer', () => {
          it('should return an array of columns with child (field)', () => {
            const field1 = {name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}
            const field2 = {name: 'name2', type: 'type', displayType: 'EDITABLE', label: 'label'}

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
                      children: [field1]
                    }, {
                      displayType: 'EDITABLE',
                      name: 'lb2',
                      label: 'label2',
                      useLabel: false,
                      children: [field2]
                    }
                  ]
                }]
              }
            }
            const result = forms.columnDefinitionTransformer(fetchResult)

            const expectedColumnDefinition = [
              {label: 'label1', useLabel: true, name: 'lb1', child: field1},
              {label: 'label2', useLabel: false, name: 'lb2', child: field2}
            ]

            expect(result).to.eql(expectedColumnDefinition)
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
                      children: [field1]
                    }, {
                      displayType: 'EDITABLE',
                      name: 'lb2',
                      label: 'label2',
                      useLabel: false,
                      children: [field2Hidden]
                    },
                    {
                      displayType: 'HIDDEN',
                      name: 'lb3',
                      label: 'label3',
                      useLabel: false,
                      children: [field1]
                    }
                  ]
                }]
              }
            }
            const result = forms.columnDefinitionTransformer(fetchResult)

            const expectedColumnDefinition = [
              {label: 'label1', useLabel: true, name: 'lb1', child: field1}
            ]

            expect(result).to.eql(expectedColumnDefinition)
          })
        })

        describe('fetchForm', () => {
          it('should call fetch ', () => {
            fetchMock.get('*', {})
            return forms.fetchForm('User_search').then(res => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/forms/User_search')
            })
          })

          it('should ignore 404 errors', () => {
            const body = new Blob(['{}'], {type: 'application/json'})
            const mockedResponse = new Response(body, {'status': 404})

            fetchMock.get('*', mockedResponse)

            const transformer = json => json.form || 'no form'

            return forms.fetchForm('User_search', transformer).then(res => {
              expect(res).to.eql('no form')
            })
          })
        })
      })
    })
  })
})
