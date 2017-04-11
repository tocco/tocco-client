import React from 'react'
import {Field, reducer as formReducer, touch} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import DetailForm from './DetailForm'

import {mount} from 'enzyme'
import {IntlStub, context} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      it('should display the right amount of Fields according to form definition', () => {
        const formDefinition = {
          'name': 'UserSearch_detail',
          'type': 'ch.tocco.nice2.model.form.components.Form',
          'displayType': 'READONLY',
          'children': [
            {
              'name': 'box1',
              'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
              'displayType': 'READONLY',
              'children': [
                {
                  'name': 'box1',
                  'type': 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
                  'displayType': 'READONLY',
                  'children': [
                    {
                      'name': 'user_information',
                      'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
                      'displayType': 'READONLY',
                      'children': [
                        {
                          'name': 'firstname',
                          'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                          'displayType': 'READONLY',
                          'children': [],
                          'label': 'Vorname',
                          'useLabel': 'YES'
                        },
                        {
                          'name': 'lastname',
                          'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                          'displayType': 'READONLY',
                          'children': [],
                          'label': 'Nachname',
                          'useLabel': 'YES'
                        }
                      ]
                    }
                  ],
                  'label': '##forms.UserSearch_detail:de_CH:nice2.optional.usersearch',
                  'useLabel': 'YES'
                }
              ]
            }]
        }

        const entity = {
          'key': 6,
          'model': 'User',
          'paths': {
            'firstname': {
              'type': 'field',
              'value': {
                'value': 'Firstname 6',
                'type': 'string'
              }
            },
            'lastname': {
              'type': 'field',
              'value': {
                'value': 'Lastname 997',
                'type': 'string'
              }
            }
          }
        }

        const store = createStore(() => {})

        const wrapper = mount(
          <Provider store={store}>
            <DetailForm
              submitting={false}
              submitForm={EMPTY_FUNC}
              formDefinition={formDefinition}
              entity={entity}
              entityModel={{}}
              logError={EMPTY_FUNC}
              loadRelationEntities={EMPTY_FUNC}
              relationEntities={{}}
              form="detailForm"
              intl={IntlStub}
              touch={EMPTY_FUNC}
            />
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(1)
        expect(wrapper.find(Field)).to.have.length(2)
      })

      it('should request user confirmation when touched form is left', () => {
        const formDefinition = {
          'name': 'UserSearch_detail',
          'type': 'ch.tocco.nice2.model.form.components.Form',
          'displayType': 'READONLY',
          'children': [
            {
              'name': 'firstname',
              'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
              'displayType': 'READONLY',
              'children': [],
              'label': 'Vorname',
              'useLabel': 'YES'
            }
          ]
        }

        const entity = {
          'key': 6,
          'model': 'User',
          'paths': {}
        }

        const store = createStore(combineReducers({form: formReducer}))

        const testFn = touched => {
          const block = sinon.mock()

          if (touched) {
            block.once().withExactArgs('client.entity-browser.confirmTouchedFormLeave')
          }

          const fakeContext = {router: {block}}
          const contextTypes = {router: React.PropTypes.object}

          const formComponent = context.wrapWithContext(fakeContext, contextTypes,
            <DetailForm
              submitting={false}
              submitForm={EMPTY_FUNC}
              formDefinition={formDefinition}
              entity={entity}
              entityModel={{}}
              logError={EMPTY_FUNC}
              loadRelationEntities={EMPTY_FUNC}
              relationEntities={{}}
              form="detailForm"
              intl={IntlStub}
            />
          )

          mount(
            <Provider store={store}>
              {formComponent}
            </Provider>
          )

          if (touched) {
            store.dispatch(touch('detailForm'), 'firstname')
          }

          block.verify()
        }

        // field touched -> confirmation requested
        testFn(true)

        // no field touched -> no confirmation requested
        testFn(false)
      })
    })
  })
})
