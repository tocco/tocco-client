import * as actions from './actions'
import reducer from './index'

describe('merge', () => {
  describe('modules', () => {
    describe('merge', () => {
      describe('reducer', () => {
        describe('executeMerge', () => {
          test('should be pending', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: false
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: true
            }

            expect(reducer(stateBefore, actions.executeMerge())).to.deep.equal(expectedStateAfter)
          })
        })

        describe('mergeResponse', () => {
          test('no longer pending and set response', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: true,
              mergeResponse: null
            }

            const mergeResponse = {
              notCopiedRelations: [],
              notDeletedEntities: [],
              showPermissionMessage: true
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: false,
              mergeResponse
            }

            expect(reducer(stateBefore, actions.setMergeResponse(mergeResponse))).to.deep.equal(expectedStateAfter)
          })
        })

        describe('mergeErrors', () => {
          test('no longer pending and set response error', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: true,
              mergeErrorMsg: null,
              mergeValidationErrors: []
            }

            const mergeErrorMsg = 'Failed'
            const mergeValidationErrors = []

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              },
              mergePending: false,
              mergeErrorMsg,
              mergeValidationErrors
            }

            expect(reducer(stateBefore, actions.setMergeError(mergeErrorMsg, mergeValidationErrors))).to.deep.equal(
              expectedStateAfter
            )
          })
        })

        describe('setSelectedSingle', () => {
          test('should set single selected', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '2'
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '2',
                  lastname: '2'
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedSingle('firstname', '2'))).to.deep.equal(expectedStateAfter)
          })
        })

        describe('setSelectedMultiple', () => {
          test('should set multiple selected (add)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    4000: '1'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '1', '4000', true))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should set multiple selected (remove)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    5000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '1', '5000', false))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should set multiple selected (override)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    6000: '1'
                  }
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multiple: {
                  relPrincipal: {
                    1000: '1',
                    2000: '2'
                  },
                  relAddress: {
                    3000: '1',
                    6000: '2'
                  }
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultiple('relAddress', '2', '6000', true))).to.deep.equal(
              expectedStateAfter
            )
          })
        })

        describe('setSelectedMultipleAll', () => {
          test('should set multiple all selected (add to empty array)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: [],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['2'],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', true))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should set multiple all selected (add)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['1'],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['1', '2'],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', true))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should set multiple all selected (remove)', () => {
            const stateBefore = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: ['2'],
                  relRegistration: ['1']
                }
              }
            }

            const expectedStateAfter = {
              selected: {
                targetEntity: '1',
                multipleAll: {
                  relMail: [],
                  relRegistration: ['1']
                }
              }
            }

            expect(reducer(stateBefore, actions.setSelectedMultipleAll('relMail', '2', false))).to.deep.equal(
              expectedStateAfter
            )
          })
        })

        describe('setTargetEntity', () => {
          test('should set target entity', () => {
            const sourceData = require('../../dev/data/sourceResponse.json')

            const stateBefore = {
              sourceData,
              selected: {
                targetEntity: null,
                single: {},
                multiple: {},
                multipleAll: {}
              }
            }

            const expectedStateAfter = {
              sourceData,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '1',
                  lastname: '1',
                  callname: '1',
                  birthdate: '1',
                  user_nr: '1',
                  relGender: '1',
                  relAcademic_title: '1'
                },
                multiple: {
                  relPrincipal: {
                    3026: '10',
                    3150: '1',
                    5711: '1',
                    5712: '1'
                  }
                },
                multipleAll: {
                  relMail: ['1', '2', '10']
                }
              }
            }

            expect(reducer(stateBefore, actions.setTargetEntity('1'))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
