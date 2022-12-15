import {screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import DetailForm from './DetailForm'

const EMPTY_FUNC = () => {}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      test('should display the right amount of fields according to form definition', () => {
        const formDefinition = {
          id: 'UserSearch_detail',
          children: [
            {
              id: 'box1',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'box1',
                  componentType: 'layout',
                  layoutType: 'horizontal-box',
                  readonly: false,
                  children: [
                    {
                      id: 'user_information',
                      componentType: 'layout',
                      layoutType: 'horizontal-box',
                      displayType: 'READONLY',
                      children: [
                        {
                          id: 'firstname',
                          componentType: 'field-set',
                          label: 'Vorname',
                          scopes: [],
                          hidden: false,
                          children: [
                            {
                              id: 'firstname',
                              path: 'firstname',
                              componentType: 'field',
                              dataType: 'string',
                              label: null
                            }
                          ]
                        },
                        {
                          id: 'lastname',
                          componentType: 'field-set',
                          label: 'Nachname',
                          scopes: [],
                          hidden: false,
                          readonly: false,
                          children: [
                            {
                              id: 'lastname',
                              path: 'lastname',
                              componentType: 'field',
                              dataType: 'string',
                              label: null
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  label: null
                }
              ]
            }
          ]
        }

        const entity = {
          key: 6,
          model: 'User',
          paths: {
            pk: {
              type: 'serial',
              writable: true,
              value: 6
            },
            firstname: {
              type: 'string',
              value: 'Firstname 6'
            },
            lastname: {
              type: 'string',
              value: 'Lastname 997'
            }
          }
        }

        const formValues = {
          firstname: 'Firstname 6',
          lastname: 'Lastname 997'
        }

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}},
            config: {configSelector: () => ({})}
          },
          form: {
            detailForm: {values: {}}
          },
          input: {
            mode: 'update'
          },
          entityDetail: {
            entityModel: {
              useNiceFields: false,
              keyField: 'pk'
            },
            entity: {
              paths: {
                pk: {
                  value: 1
                }
              }
            }
          }
        }))

        testingLibrary.renderWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <DetailForm
                submitting={false}
                submitForm={EMPTY_FUNC}
                formDefinition={formDefinition}
                entity={entity}
                formValues={formValues}
                logError={EMPTY_FUNC}
                loadRelationEntities={EMPTY_FUNC}
                uploadDocument={EMPTY_FUNC}
                openAdvancedSearch={EMPTY_FUNC}
                changeFieldValue={EMPTY_FUNC}
                relationEntities={{}}
                form="detailForm"
                intl={IntlStub}
                touch={EMPTY_FUNC}
                fireTouched={EMPTY_FUNC}
                touchAllFields={EMPTY_FUNC}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(screen.queryAllByRole('textbox')).to.have.length(2)
        expect(screen.queryByText('Vorname')).to.exist
        expect(screen.queryByText('Nachname')).to.exist
      })
    })
  })
})
