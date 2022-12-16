import {screen} from '@testing-library/react'
import {reduxForm} from 'redux-form'
import {testingLibrary} from 'tocco-test-util'

import appFactory from '../appFactory'
import FormBuilder from './FormBuilder'

/* eslint-disable react/prop-types */
jest.mock('../formField', () => ({
  FormField: ({data}) => {
    const {id, parentReadOnly} = data
    return (
      <div data-testid="form-field" data-prop-parentreadonly={parentReadOnly}>
        {id}
      </div>
    )
  }
}))
/* eslint-enable react/prop-types */

const testData = {
  entity: {
    key: '1',
    paths: {
      firstname: {
        type: 'field',
        value: {
          value: 'First Name',
          type: 'string',
          readable: true,
          writable: true
        }
      },
      lastname: {
        type: 'field',
        value: {
          value: 'Last Name',
          type: 'string',
          readable: true,
          writable: true
        }
      }
    }
  },
  formName: 'detail',
  formValues: {
    firstname: 'Fist Name',
    lastname: 'Last Name',
    'not-readonly-field': 'test'
  },
  formDefinition: {
    id: 'UserSearch_detail',
    readonly: false,
    children: [
      {
        id: 'box1',
        componentType: 'layout',
        layoutType: 'vertical-box',
        readonly: true,
        children: [
          {
            id: 'box1',
            componentType: 'layout',
            layoutType: 'horizontal-box',
            displayType: 'READONLY',
            children: [
              {
                id: 'user_information',
                label: 'Box 1',
                componentType: 'layout',
                layoutType: 'vertical-box',
                readonly: true,
                children: [
                  {
                    id: 'firstname',
                    componentType: 'field-set',
                    label: 'Vorname',
                    scopes: ['create'],
                    hidden: false,
                    readonly: true,
                    children: [
                      {
                        id: 'firstname-field', // does not match path by intention (-> should use path to get data)
                        componentType: 'field',
                        path: 'firstname',
                        dataType: 'string',
                        label: null
                      }
                    ]
                  },
                  {
                    id: 'lastname',
                    componentType: 'field-set',
                    label: 'Nachname',
                    hidden: false,
                    readonly: true,
                    children: [
                      {
                        id: 'lastname',
                        componentType: 'field',
                        path: 'lastname',
                        dataType: 'string',
                        label: null
                      }
                    ]
                  }
                ]
              },
              {
                id: 'readonly-box',
                componentType: 'layout',
                layoutType: 'vertical-box',
                readonly: true,
                label: 'Box 2',
                children: [
                  {
                    id: 'not-readonly-field-set',
                    componentType: 'field-set',
                    label: 'Not Readonly',
                    hidden: false,
                    readonly: false,
                    children: [
                      {
                        id: 'not-readonly-field',
                        componentType: 'field',
                        path: 'not-readonly-field',
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
}

const Form = reduxForm({form: 'test-form'})(({children}) => children)
const createStore = () => appFactory.createStore(() => {}, null, {})

describe('app-extensions', () => {
  describe('form', () => {
    describe('FormBuilder', () => {
      test('should render layout boxes and Fields', async () => {
        const {entity, formName, formDefinition, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, formFieldMapping: {}, fieldMappingType: 'editable'}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('Box 1')).to.exist
        expect(screen.queryByText('input-detail-firstname')).to.exist
        expect(screen.queryByText('input-detail-lastname')).to.exist

        expect(screen.queryByText('Box 2')).to.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.exist
      })

      test('should not render field if beforeRenderField returns false', () => {
        const {entity, formName, formDefinition, formValues} = testData

        const beforeRenderField = name => name !== 'lastname'

        const props = {
          entity,
          formName,
          formDefinition,
          formValues,
          beforeRenderField,
          formFieldMapping: {},
          fieldMappingType: 'editable'
        }
        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('Box 1')).to.exist
        expect(screen.queryByText('input-detail-firstname')).to.exist
        expect(screen.queryByText('input-detail-lastname')).to.not.exist

        expect(screen.queryByText('Box 2')).to.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.exist
      })

      test('should not require an entity (should not check readable flag in this case)', () => {
        const {formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, formName, formDefinition, formValues, formFieldMapping: {}, fieldMappingType: 'editable'}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-firstname')).to.exist
        expect(screen.queryByText('input-detail-lastname')).to.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.exist
      })

      test('should not render empty values in readonly form', () => {
        const {entity, formName, formDefinition} = testData
        const formDefinitionReadOnly = {...formDefinition, readonly: true}
        const formValues = {lastname: undefined}
        const props = {entity, formName, formValues, formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} formDefinition={formDefinitionReadOnly} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-firstname')).to.not.exist
        expect(screen.queryByText('input-detail-lastname')).to.not.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.not.exist
      })

      test('should render fields with matching scope/mode', () => {
        const {formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, formName, formDefinition, formValues, mode: 'create', formFieldMapping: {}}

        const store = appFactory.createStore(() => {}, null, {})
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-firstname')).to.exist
        expect(screen.queryByText('input-detail-lastname')).to.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.exist
      })

      test('should NOT render fields with unmatching scope/mode', () => {
        const {formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = appFactory.createStore(() => {}, null, {})
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-firstname')).to.not.exist
        expect(screen.queryByText('input-detail-lastname')).to.exist
        expect(screen.queryByText('input-detail-not-readonly-field')).to.exist
      })

      test('should render children of readonly layouts to readonly', () => {
        const {formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        const el = screen.getByText('input-detail-not-readonly-field')
        expect(el.getAttribute('data-prop-parentreadonly')).to.eql('true')
      })

      test('should read multi paths entity fields', () => {
        const entity = {
          paths: {
            relOrder: {
              type: 'entity',
              writable: false,
              value: {
                _links: null,
                key: '12556',
                model: 'Order',
                version: 4,
                paths: {
                  relOrder_debitor_status: {
                    type: 'entity',
                    writable: true,
                    value: {
                      _links: null,
                      key: '2',
                      model: 'Order_debitor_status',
                      version: 2,
                      paths: {}
                    }
                  }
                }
              }
            }
          }
        }

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'Order_debitor_status',
                  componentType: 'field-set',
                  label: 'Status',
                  hidden: false,
                  readonly: false,
                  children: [
                    {
                      id: 'Order_debitor_status', // does not match path by intention (-> should use path to get data)
                      componentType: 'field',
                      path: 'relOrder.relOrder_debitor_status',
                      dataType: 'string',
                      label: null
                    }
                  ]
                }
              ]
            }
          ]
        }

        const {formName, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}
        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-relOrder.relOrder_debitor_status')).to.exist
      })

      test('should not render multipath fields with missing parts', () => {
        const entity = {
          paths: {
            relOrder: {
              type: 'entity-list',
              writable: null,
              value: []
            }
          }
        }

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'Order_debitor_status',
                  componentType: 'field-set',
                  label: 'Status',
                  hidden: false,
                  readonly: false,
                  children: [
                    {
                      id: 'relOrder_debitor_status',
                      componentType: 'field',
                      path: 'relOrder.relOrder_debitor_status',
                      dataType: 'string',
                      label: null
                    }
                  ]
                }
              ]
            }
          ]
        }

        const {formName, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-relOrder.relOrder_debitor_status')).to.not.exist
      })

      test('should render multipath fields with missing parts in create mode', () => {
        const entity = {
          paths: {
            relOrder: {
              type: 'entity-list',
              writable: null,
              value: []
            }
          }
        }

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'Order_debitor_status',
                  componentType: 'field-set',
                  label: 'Status',
                  hidden: false,
                  readonly: false,
                  children: [
                    {
                      id: 'relOrder_debitor_status',
                      componentType: 'field',
                      path: 'relOrder.relOrder_debitor_status',
                      dataType: 'string',
                      label: null
                    }
                  ]
                }
              ]
            }
          ]
        }

        const {formName, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'create', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-relOrder.relOrder_debitor_status')).to.exist
      })

      test('should render description field', () => {
        const entity = {
          paths: {
            relOrder: {
              type: 'entity-list',
              writable: null,
              value: []
            }
          }
        }

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'email_change_field_description',
                  label: null,
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'email_change_field_description',
                      label: null,
                      componentType: 'description',
                      title: 'description title',
                      text: 'description text',
                      mode: 'tooltip'
                    }
                  ],
                  readonly: false,
                  hidden: false,
                  useLabel: 'no',
                  scopes: [],
                  ignoreCopy: false
                }
              ]
            }
          ]
        }

        const {formName, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-email_change_field_description')).to.exist
      })

      test('should always render location field', () => {
        const entity = {}

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'locationfield_c',
                  label: 'PLZ / Ort',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'locationfield_c',
                      label: null,
                      componentType: 'field',
                      path: null,
                      dataType: 'location',
                      validation: null,
                      defaultValue: null,
                      autoCompleteEndpoint: null,
                      locationMapping: {
                        postcode: 'zip_c',
                        city: 'city_c',
                        street: 'address_c',
                        country: 'relCountry_c',
                        state: 'canton',
                        district: 'admincode2'
                      },
                      countries: ['DE', 'AT', 'CH', 'IT', 'FR', 'LI']
                    }
                  ],
                  readonly: false,
                  hidden: false,
                  useLabel: 'yes',
                  scopes: [],
                  ignoreCopy: false
                }
              ]
            }
          ]
        }

        const {formName, formValues} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-locationfield_c')).to.exist
      })

      test('should render empty selector fields', () => {
        const entity = {
          paths: {
            'relAddress_user[publication]': {
              type: 'entity',
              writable: true,
              value: {
                key: '1',
                model: 'Address_user',
                version: 1,
                paths: {
                  relAddress: {
                    type: 'entity',
                    writable: true,
                    value: {
                      key: '1',
                      model: 'Address',
                      version: 18,
                      paths: {
                        company_c: {
                          type: 'string',
                          writable: true,
                          value: 'Tocco AG'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const formDefinition = {
          id: 'User_detail',
          readonly: false,
          children: [
            {
              id: 'address_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'relAddress_user[publication].relAddress.company_c',
                  label: 'Korresp.-Firma',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relAddress_user[publication].relAddress.company_c',
                      label: null,
                      componentType: 'field',
                      path: 'relAddress_user[publication].relAddress.company_c',
                      dataType: 'string'
                    }
                  ],
                  readonly: false,
                  hidden: false,
                  useLabel: 'yes',
                  scopes: [],
                  ignoreCopy: false
                }
              ]
            }
          ]
        }

        const formValues = {
          'relAddress_user=-=publication=_=--relAddress--company_c': ''
        }

        const {formName} = testData
        const props = {entity, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-relAddress_user[publication].relAddress.company_c')).to.exist
      })

      test('should not render empty selector fields on readonly form', () => {
        const entity = {
          paths: {
            'relAddress_user[publication]': {
              type: 'entity',
              writable: true,
              value: {
                key: '1',
                model: 'Address_user',
                version: 1,
                paths: {
                  relAddress: {
                    type: 'entity',
                    writable: true,
                    value: {
                      key: '1',
                      model: 'Address',
                      version: 18,
                      paths: {
                        company_c: {
                          type: 'string',
                          writable: true,
                          value: 'Tocco AG'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const formDefinition = {
          id: 'User_detail',
          readonly: false,
          children: [
            {
              id: 'address_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: false,
              children: [
                {
                  id: 'relAddress_user[publication].relAddress.company_c',
                  label: 'Korresp.-Firma',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relAddress_user[publication].relAddress.company_c',
                      label: null,
                      componentType: 'field',
                      path: 'relAddress_user[publication].relAddress.company_c',
                      dataType: 'string'
                    }
                  ],
                  readonly: false,
                  hidden: false,
                  useLabel: 'yes',
                  scopes: [],
                  ignoreCopy: false
                }
              ]
            }
          ]
        }

        const formValues = {
          'relAddress_user=-=publication=_=--relAddress--company_c': ''
        }

        const {formName} = testData
        const props = {
          entity,
          formName,
          formDefinition,
          formValues,
          mode: 'update',
          formFieldMapping: {},
          readonly: true
        }

        const store = createStore()
        testingLibrary.renderWithStore(
          <Form>
            <FormBuilder {...props} />
          </Form>,
          {store}
        )

        expect(screen.queryByText('input-detail-relAddress_user[publication].relAddress.company_c')).to.not.exist
      })
    })
  })
})
