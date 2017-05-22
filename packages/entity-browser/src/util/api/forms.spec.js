import * as forms from './forms'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('getFieldsOfDetailForm', () => {
          it('get array of fields and ignore not simple types and iterators', () => {
            const formDefinition = {
              name: 'fromX',
              children: [
                {
                  type: 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
                  name: 'box 1',
                  children: [
                    {
                      type: 'ch.tocco.nice2.model.form.components.layout.HorizontalBox1',
                      name: 'box 2',
                      children: [
                        {
                          name: 'firstname',
                          type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                        },
                        {
                          name: 'lastname',
                          type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                        },
                        {
                          name: 'relAffiliation',
                          type: 'ch.tocco.nice2.model.form.components.table.Table'
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'xyz',
                  type: 'ch.tocco.nice2.model.form.components.simple.SomeType'
                },
                {
                  name: 'relTask_note',
                  type: 'ch.tocco.nice2.model.form.components.navigation.IteratorComponent',
                  children: [
                    {
                      name: 'iteratorField',
                      type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                    }]
                }
              ]
            }

            const fields = forms.getFieldsOfDetailForm(formDefinition)
            expect(fields).to.eql(['firstname', 'lastname', 'xyz'])
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
        })
      })
    })
  })
})
