import React from 'react'
import {intlEnzyme, IntlStub} from 'tocco-test-util'

import {ReportSettings} from './ReportSettings'
const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('ReportSettings', () => {
        test('should render simple-form for general and recipient settings and one for custom settings', () => {
          const wrapper = intlEnzyme.shallowWithIntl(<ReportSettings onSubmit={EMPTY_FUNC} intl={IntlStub}
            settingsDefinition={formDefinitionFull} listApp={EMPTY_FUNC} formApp={EMPTY_FUNC}/>)

          expect(wrapper.find(wrapper.instance().SimpleFormContainer)).to.have.length(2)
        })

        test('should not render custom settings simple-form if custom settings are null', () => {
          const settingsDefinition = {...formDefinitionFull, customSettings: null}

          const wrapper = intlEnzyme.shallowWithIntl(<ReportSettings onSubmit={EMPTY_FUNC} intl={IntlStub}
            settingsDefinition={settingsDefinition} listApp={EMPTY_FUNC} formApp={EMPTY_FUNC}/>)

          expect(wrapper.find(wrapper.instance().SimpleFormContainer)).to.have.length(1)
        })
      })
    })
  })
})

const formDefinitionFull = {
  '_links': {},
  'customSettings': {
    'entity': {
      'createPermission': false,
      'fields': [
        {
          'defaultValue': null,
          'fieldName': 'print_article_description',
          'type': 'boolean',
          'validation': {}
        },
        {
          'defaultValue': null,
          'fieldName': 'print_copy_background_image',
          'type': 'boolean',
          'validation': {}
        }
      ],
      'id': 'Bill_report_settings',
      'relations': []
    },
    'form': {
      'form': {
        'children': [
          {
            'children': [
              {
                'children': [
                  {
                    'children': [
                      {
                        'children': [
                          {
                            'componentType': 'field',
                            'dataType': 'boolean',
                            'defaultValue': null,
                            'id': 'print_article_description',
                            'label': null,
                            'path': 'print_article_description'
                          }
                        ],
                        'componentType': 'field-set',
                        'hidden': false,
                        'id': 'print_article_description',
                        'label': 'Mit Artikelbeschr.',
                        'readonly': false,
                        'scopes': []
                      },
                      {
                        'children': [
                          {
                            'componentType': 'field',
                            'dataType': 'boolean',
                            'defaultValue': null,
                            'id': 'print_copy_background_image',
                            'label': null,
                            'path': 'print_copy_background_image'
                          }
                        ],
                        'componentType': 'field-set',
                        'hidden': false,
                        'id': 'print_copy_background_image',
                        'label': 'Kopie',
                        'readonly': false,
                        'scopes': []
                      }
                    ],
                    'componentType': 'layout',
                    'id': 'master_data',
                    'label': 'Stammdaten',
                    'layoutType': 'vertical-box'
                  }
                ],
                'componentType': 'layout',
                'id': 'box1',
                'label': null,
                'layoutType': 'vertical-box'
              }
            ],
            'componentType': 'layout',
            'id': 'box1',
            'label': null,
            'layoutType': 'horizontal-box'
          }
        ],
        'componentType': 'form',
        'id': 'Bill_report_settings_detail',
        'label': null,
        'modelid': 'Bill_report_settings',
        'readonly': false
      },
      'model': 'Bill_report_settings'
    }
  },
  'description': {
    'ignoreSelection': false,
    'name': 'Sample Report'
  },
  'generalSettings': [
    {
      'defaultValue': 'Rechnung',
      'description': null,
      'disabled': false,
      'label': 'Dateiid',
      'id': 'fileid',
      'options': null,
      'type': 'string'
    },
    {
      'defaultValue': null,
      'description': null,
      'disabled': false,
      'label': 'Archivierung',
      'id': 'archiveType',
      'options': [
        {
          'display': 'Nicht archiviert',
          'key': 'not_archived'
        },
        {
          'display': 'Archiviert',
          'key': 'archived'
        },
        {
          'display': 'Archiviert mit Publikation',
          'key': 'archived_and_published'
        }
      ],
      'type': 'single-select-box'
    }
  ],
  'recipientSettings': [
    {
      'type': 'multi-select-box',
      'defaultValue': [],
      'label': 'test',
      'id': 'recipients',
      'options': [
        {
          'display': 'Auftrag (1)',
          'key': '33'
        }
      ]
    },
    {
      'type': 'multi-remote-field',
      'defaultValue': [],
      'label': 'Remote',
      'id': 'recipients2',
      'options': null,
      'targetEntity': 'User'
    }
  ]
}
