import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

export const setupActions = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionForm/check*?'),
    simpleActionFormCheck(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionForm*?'),
    simpleAction(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionConfirm/check*?'),
    simpleActionConfirmCheck(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionConfirm*?'),
    simpleAction(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionAbort/check*?'),
    simpleActionAbortCheck(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/validationError/checkr*?'),
    simpleActionCheck(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/validationError*?'),
    validationError(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleAction/check*?'),
    simpleActionCheck(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleAction*?'),
    simpleAction(timeout)
  )
}

const simpleActionCheck = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call simple action check', url, opts)

      return {
        body: {
          initialFormValues: null,
          preCheck: {
            success: true,
            message: null,
            confirmMessage: null,
            messageType: null
          }
        }
      }
    })
  }

const simpleActionAbortCheck = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call simple action confirm check', url, opts)

      return {
        body: {
          initialFormValues: null,
          preCheck: {
            success: false,
            message: 'Diese Noteneingabe wurde geschlossen. Es sind keine weiteren Eingaben erlaubt.',
            confirmMessage: null,
            messageType: 'INFO'
          }
        }
      }
    })
  }

const simpleActionConfirmCheck = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call simple action confirm check', url, opts)

      return {
        body: {
          initialFormValues: null,
          preCheck: {
            success: true,
            message: null,
            confirmMessage: 'Are you sure you want to do this?',
            messageType: 'CONFIRM'
          }
        }
      }
    })
  }

const simpleActionFormCheck = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call simple action form check', url, opts)
      return {
        body: formResponse
      }
    })
  }

const formResponse = {
  initialFormValues: {
    formDefinition: {
      _links: {
        self: {
          href: 'http://localhost:8080/nice2/rest/forms/Evaluation_export_action_settings/create'
        }
      },
      form: {
        id: 'Evaluation_export_action_settings_detail',
        label: null,
        componentType: 'form',
        children: [
          {
            id: 'box1',
            label: null,
            componentType: 'layout',
            children: [
              {
                id: 'box1',
                label: null,
                componentType: 'layout',
                children: [
                  {
                    id: 'master_data',
                    label: 'Stammdaten',
                    componentType: 'layout',
                    children: [
                      {
                        id: 'relCorrespondence_language',
                        label: 'Sprache',
                        componentType: 'field-set',
                        children: [
                          {
                            id: 'relCorrespondence_language',
                            label: null,
                            componentType: 'field',
                            path: 'relCorrespondence_language',
                            dataType: 'single-select-box',
                            validation: {
                              mandatory: true
                            },
                            defaultValue: null,
                            targetEntity: 'Dummy_entity',
                            relationName: 'relCorrespondence_language'
                          }
                        ],
                        readonly: false,
                        hidden: false,
                        useLabel: 'yes',
                        scopes: [
                        ]
                      },
                      {
                        id: 'filename',
                        label: 'Dateiname',
                        componentType: 'field-set',
                        children: [
                          {
                            id: 'filename',
                            label: null,
                            componentType: 'field',
                            path: 'filename',
                            dataType: 'string',
                            validation: {
                              length: {
                                toIncluding: 255
                              }
                            },
                            defaultValue: null
                          }
                        ],
                        readonly: false,
                        hidden: false,
                        useLabel: 'yes',
                        scopes: [
                        ]
                      },
                      {
                        id: 'relReport_file_format',
                        label: 'Dateiformat',
                        componentType: 'field-set',
                        children: [
                          {
                            id: 'relReport_file_format',
                            label: null,
                            componentType: 'field',
                            path: 'relReport_file_format',
                            dataType: 'single-select-box',
                            validation: {
                              mandatory: true
                            },
                            defaultValue: null,
                            targetEntity: 'Dummy_entity',
                            relationName: 'relReport_file_format'
                          }
                        ],
                        readonly: false,
                        hidden: false,
                        useLabel: 'yes',
                        scopes: [
                        ]
                      },
                      {
                        id: 'run_in_background',
                        label: 'Im Hintergrund ausführen',
                        componentType: 'field-set',
                        children: [
                          {
                            id: 'run_in_background',
                            label: null,
                            componentType: 'field',
                            path: 'run_in_background',
                            dataType: 'boolean',
                            validation: {
                            },
                            defaultValue: null
                          }
                        ],
                        readonly: false,
                        hidden: false,
                        useLabel: 'yes',
                        scopes: [
                        ]
                      }
                    ],
                    layoutType: 'vertical-box',
                    readonly: false
                  }
                ],
                layoutType: 'vertical-box',
                readonly: false
              }
            ],
            layoutType: 'horizontal-box',
            readonly: false
          }
        ],
        modelName: 'Evaluation_export_action_settings',
        readonly: false
      },
      model: 'Evaluation_export_action_settings'
    },
    formData: {
      filename: 'bptk Berufsprüfung TK Punkte',
      relCorrespondence_language: {
        display: 'Deutsch',
        key: 'de'
      }
    },
    formTitle: 'Form Title',
    formMessage: 'Form message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
  },
  preCheck: null
}

const simpleAction = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)

      return {
        status: 200,
        body: {
          success: true,
          message: 'Action completed!'
        }
      }
    })
  }

const validationError = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call validationError action', url, opts)
      return {
        status: 400,
        body: {
          message: 'Validation failed',
          errorCode: 'VALIDATION_FAILED',
          errors: [
            {
              model: 'Principal',
              key: null,
              paths: {
                username: {
                  username: [
                    'Der Wert ist bereits vergeben und dadurch nicht eindeutig'
                  ]
                }
              },
              entityValidatorErrors: {
                UsernameAsciiValidator: [
                  'Nur Buchstaben, Zahlen und die meisten Sonderzeichen sind erlaubt.'
                ]
              }
            }
          ]
        }
      }
    })
  }
