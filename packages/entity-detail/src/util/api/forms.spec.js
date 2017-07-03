import {call} from 'redux-saga/effects'
import fetchMock from 'fetch-mock'
import * as forms from './forms'
import {requestSaga} from 'tocco-util/src/rest'

describe('entity-detail', () => {
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
          it('should call request saga and transform response', () => {
            const gen = forms.fetchForm('User_search')

            expect(gen.next().value).to.eql(call(requestSaga, 'forms/User_search'))

            const resp = {
              body: {
                form: {
                  children: [{
                    name: 'firstname',
                    type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                  }]
                }
              }
            }

            expect(gen.next(resp).value).to.eql(call(forms.defaultFormTransformer, resp.body))

            const next = gen.next(resp.body.form)

            expect(next.value).to.eql(resp.body.form)
            expect(next.done).to.be.true
          })
        })
      })
    })
  })
})
