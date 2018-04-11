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

        describe('getFieldDefinitions', () => {
          it('get array of fields', () => {
            const field1 = {
              id: 'firstname',
              componentType: 'field',
              dataType: 'string'
            }
            const field2 = {
              id: 'lastname',
              componentType: 'field',
              dataType: 'string'
            }

            const field3 = {
              id: 'xyz',
              componentType: 'field',
              dataType: 'something'
            }

            const display = {
              id: 'displayxy',
              componentType: 'display'
            }

            const formDefinition = {
              id: 'fromX',
              children: [
                {
                  componentType: 'layout',
                  layoutType: 'vertical-box',
                  id: 'box 1',
                  children: [
                    {
                      componentType: 'layout',
                      layoutType: 'horizontal-box',
                      id: 'box 2',
                      children: [
                        field1,
                        field2,
                        display,
                        {
                          name: 'relAffiliation',
                          component: 'sub-table'
                        }
                      ]
                    }
                  ]
                },
                field3
              ]
            }

            const fields = forms.getFieldDefinitions(formDefinition)
            expect(fields).to.eql([field1, field2, display, field3])
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
