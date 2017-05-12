import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Field, reducer as formReducer, touch} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import DetailForm from './DetailForm'

import {IntlStub, context, intlEnzyme} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

const SIMPLE_FORM_DEFINITION = {
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

const SIMPLE_ENTITY = {
  'key': 6,
  'model': 'User',
  'paths': {}
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

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
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
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(1)
        expect(wrapper.find(Field)).to.have.length(2)
      })

      it('should request user confirmation when touched form is left', () => {
        const store = createStore(combineReducers({form: formReducer}))

        const block = sinon.spy()
        const createHref = () => {}

        const fakeContext = {router: {history: {block, createHref}}}
        const contextTypes = {router: React.PropTypes.object}

        const formComponent = context.wrapWithContext(fakeContext, contextTypes,

          <DetailForm
            submitting={false}
            submitForm={EMPTY_FUNC}
            formDefinition={SIMPLE_FORM_DEFINITION}
            entity={SIMPLE_ENTITY}
            entityModel={{}}
            logError={EMPTY_FUNC}
            loadRelationEntities={EMPTY_FUNC}
            relationEntities={{}}
            form="detailForm"
            intl={IntlStub}
          />
        )

        intlEnzyme.mountWithIntl(<Provider store={store}>
          {formComponent}
        </Provider>
        )

        // touch a field to enable the prompt -> context.history.block must be called
        store.dispatch(touch('detailForm'), 'firstname')

        expect(block).to.be.calledWith('client.entity-browser.detail.confirmTouchedFormLeave')
      })

      it('should not request user confirmation when untouched form is left', () => {
        const store = createStore(combineReducers({form: formReducer}))

        const block = sinon.spy()
        const createHref = () => {
        }

        const fakeContext = {router: {history: {block, createHref}}}
        const contextTypes = {router: React.PropTypes.object}

        const formComponent = context.wrapWithContext(fakeContext, contextTypes,
          <DetailForm
            submitting={false}
            submitForm={EMPTY_FUNC}
            formDefinition={SIMPLE_FORM_DEFINITION}
            entity={SIMPLE_ENTITY}
            entityModel={{}}
            logError={EMPTY_FUNC}
            loadRelationEntities={EMPTY_FUNC}
            relationEntities={{}}
            form="detailForm"
            intl={IntlStub}
          />
        )

        intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              {formComponent}
            </MemoryRouter>
          </Provider>
        )

        // form is untouched -> context.history.block must not be called
        expect(block).not.to.be.called
      })
    })
  })
})
