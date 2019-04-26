import React from 'react'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {IntlStub, intlEnzyme} from 'tocco-test-util'

import Form from './Form'

const EMPTY_FUNC = () => {
}

describe('simple-form', () => {
  describe('components', () => {
    describe('Form', () => {
      test(
        'should display the right amount of fields according to form definition',
        () => {
          const formDefinition = {
            'id': 'UserSearch_detail',
            'children': [
              {
                'id': 'box1',
                'componentType': 'layout',
                'layoutType': 'vertical-box',
                'readonly': true,
                'children': [
                  {
                    'id': 'box1',
                    'componentType': 'layout',
                    'layoutType': 'horizontal-box',
                    'readonly': true,
                    'children': [
                      {
                        'id': 'user_information',
                        'componentType': 'layout',
                        'layoutType': 'horizontal-box',
                        'readonly': true,
                        'children': [

                          {
                            'id': 'firstname',
                            'componentType': 'field-set',
                            'label': 'Vorname',
                            'hidden': false,
                            'readonly': true,
                            'children': [
                              {
                                'id': 'firstname',
                                'componentType': 'field',
                                'dataType': 'string',
                                'label': null
                              }
                            ]
                          },
                          {
                            'id': 'lastname',
                            'componentType': 'field-set',
                            'label': 'Nachname',
                            'hidden': false,
                            'readonly': true,
                            'children': [
                              {
                                'id': 'lastname',
                                'componentType': 'field',
                                'dataType': 'string',
                                'label': null
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    'label': null
                  }
                ]
              }]
          }
          const model = {
            fields: [],
            relations: []
          }

          const store = createStore(() => ({
            formData: {
              relationEntities: {data: {}},
              tooltips: {data: {}}
            },
            form: {
              detailForm: {}
            }
          }))

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
                uploadDocument={EMPTY_FUNC}
                openAdvancedSearch={EMPTY_FUNC}
                loadTooltip={EMPTY_FUNC}
                changeFieldValue={EMPTY_FUNC}
              />
            </Provider>
          )

          expect(wrapper.find('form')).to.have.length(1)
          expect(wrapper.find(Field)).to.have.length(2)
        }
      )
    })
  })
})
