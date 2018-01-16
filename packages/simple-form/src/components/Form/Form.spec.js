import React from 'react'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Form from './Form'
import {IntlStub, intlEnzyme} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      it('should display the right amount of Fields according to form definition', () => {
        const formDefinition = {
          'name': 'UserSearch_detail',
          'type': 'ch.tocco.nice2.model.form.components.Form',
          'displayType': 'EDITABLE',
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

        const model = {
          fields: [],
          relations: []
        }

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <Form
              initializeForm={EMPTY_FUNC}
              handleSubmit={EMPTY_FUNC}
              onSubmit={EMPTY_FUNC}
              onCancel={EMPTY_FUNC}
              formDefinition={formDefinition}
              model={model}
              intl={IntlStub}
            />
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(1)
        expect(wrapper.find(Field)).to.have.length(2)
      })
    })
  })
})
