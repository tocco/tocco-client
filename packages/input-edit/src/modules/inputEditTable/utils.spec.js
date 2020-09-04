import {transformResponseData} from './utils'

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('utils', () => {
      describe('transformResponseData', () => {
        test('should flatten entities values, leave other values and add __key attribute', () => {
          const response = {
            body: {
              data: [{
                1: 2.000,
                2: 5.000,
                dispense: {
                  type: 'boolean',
                  writable: null,
                  value: false
                },
                pk: {
                  type: 'serial',
                  writable: null,
                  value: 12282
                },
                relRegistration: {
                  type: 'entity-list',
                  writable: null,
                  value: [{
                    key: '6814',
                    model: 'Registration',
                    version: 0,
                    paths: {
                      relRegistration_type: {
                        type: 'entity',
                        writable: null,
                        value: {
                          key: '2',
                          model: 'Registration_type',
                          version: 2,
                          paths: {
                            label: {
                              type: 'string',
                              writable: null,
                              value: 'Regulär'
                            }
                          }
                        }
                      }
                    }
                  }]
                },
                relUser: {
                  type: 'entity',
                  writable: null,
                  value: {
                    key: '743',
                    model: 'User',
                    version: 2,
                    paths: {
                      user_nr: {
                        type: 'counter',
                        writable: null,
                        value: 737
                      },
                      firstname: {
                        type: 'string',
                        writable: null,
                        value: 'Sophie'
                      },
                      lastname: {
                        type: 'string',
                        writable: null,
                        value: 'Abbott'
                      }
                    }
                  }
                },
                value: {
                  type: 'decimal',
                  writable: null,
                  value: 7.00
                }
              }, {
                pk: {
                  type: 'serial',
                  writable: null,
                  value: 12282
                },
                1: 3,
                2: 6,
                dispense: {
                  type: 'boolean',
                  writable: null,
                  value: false
                }
              }
              ]
            }
          }
          const result = transformResponseData(response)
          const expectedResult = [
            {
              '1': 2,
              '2': 5,
              '__key': 12282,
              'dispense': false,
              'pk': 12282,
              'relRegistration': [{key: '6814', model: 'Registration', version: 0}],
              'relRegistration.relRegistration_type': [{key: '2', model: 'Registration_type', version: 2}],
              'relRegistration.relRegistration_type.label': ['Regulär'],
              'relUser': {key: '743', model: 'User', version: 2},
              'relUser.firstname': 'Sophie',
              'relUser.lastname': 'Abbott',
              'relUser.user_nr': 737,
              'value': 7
            },
            {
              1: 3,
              2: 6,
              __key: 12282,
              dispense: false,
              pk: 12282
            }
          ]
          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
